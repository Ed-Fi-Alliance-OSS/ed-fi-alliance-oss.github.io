# node-url-to-markdown

A simple Node.js package that converts web page contents to Markdown format using the Turndown library.

## Installation

To install the package, run the following command:

```
npm install node-url-to-markdown
```

## Usage

You can use the `convertUrlToMarkdown` function to convert the contents of a web page to Markdown. Here's how to do it:

```javascript
const { convertUrlToMarkdown } = require('node-url-to-markdown');

const url = 'https://example.com';
convertUrlToMarkdown(url)
    .then(markdown => {
        console.log(markdown);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Functionality

- **convertUrlToMarkdown(url)**: Fetches the HTML content from the provided URL and converts it to Markdown format.

## Dependencies

This package requires the following npm packages:

- `axios`: For making HTTP requests to fetch web page content.
- `turndown`: For converting HTML content to Markdown.

## License

This project is licensed under the MIT License.