# URL to Markdown Converter

This Node.js package converts the contents of a web page to Markdown using the
`turndown` package and saves the output to a file. It also runs `markdownlint`
on the generated Markdown to ensure it follows best practices.

## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

To run the package, use the following command:

```sh
npm run start <URL> <output-file>
```

## Functionality

* **convertUrlToMarkdown(url)**: Fetches the HTML content from the provided URL
  and converts it to Markdown format.

## Dependencies

This package requires the following npm packages:

* `axios`: For making HTTP requests to fetch web page content.
* `turndown`: For converting HTML content to Markdown.
