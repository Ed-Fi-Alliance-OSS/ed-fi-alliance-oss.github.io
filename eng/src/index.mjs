import axios from 'axios';
import TurndownService from 'turndown';
import { applyFixes } from "markdownlint";
import { lint as lintSync } from "markdownlint/sync";
import fs from 'fs';

async function convertUrlToMarkdown(url) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        const cleanedHtmlContent = removeJsAndCss(htmlContent);
        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(cleanedHtmlContent);
        return markdown;
    } catch (error) {
        throw new Error(`Failed to convert URL to Markdown: ${error.message}`);
    }
}

function removeJsAndCss(html) {
  // Remove <script> tags and their content
  let previous;
  do {
    previous = html;
    html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
  } while (html !== previous);
  // Remove <style> tags and their content
  do {
    previous = html;
    html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '');
  } while (html !== previous);
  // Remove inline JavaScript
  html = html.replace(/ on\w+="[^"]*"/gi, '');
  return html;
}

const url = process.argv[2];
const outputFileName = process.argv[3];

if (!url) {
    console.error('Please provide a URL as a command line argument.');
    process.exit(1);
}

if (!outputFileName) {
    console.error('Please provide an output file name as a command line argument.');
    process.exit(1);
}

convertUrlToMarkdown(url)
    .then(original => {
        const results = lintSync({ "strings": { "content": original } });
        const fixed = applyFixes(original, results.content);
        fs.writeFileSync(outputFileName, fixed);
        console.log(`Markdown saved to ${outputFileName}`);
    })
    .catch(error => {
        console.error(error.message);
    });
