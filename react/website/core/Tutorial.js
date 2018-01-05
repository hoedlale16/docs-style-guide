const React = require('react');
const Sidebar = require('./Sidebar');
const Remarkable = require('remarkable');
const md = new Remarkable();
const toSlug = require('./toSlug');

/**
 * The anchors plugin adds GFM-style anchors to headings.
 */
function anchors(md) {
  md.renderer.rules.heading_open = function(tokens, idx /*, options, env */) {
    const textToken = tokens[idx + 1];
    return (
      '<h' +
      tokens[idx].hLevel +
      '><a class="anchor" id="' + toSlug(textToken.content) + '" aria-hidden="true" name="' +
      toSlug(textToken.content) +
      '"></a><a href="#' +
      toSlug(textToken.content) +
      '" aria-hidden="true" class="hash-link" ><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>'
    );
  };
}

class Tutorial extends React.Component {
  render() {
    md.use(anchors);
    return (
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Title</title>
        <link rel="stylesheet" href="/css/styles.css"/>
      </head>
      <body>
        <div>
          <div className="sidebar">
            <div className="sidebar-content">
              <Sidebar
                content={this.props.content} />
            </div>
          </div>
          <div className="content"
            style={{
              display: 'block',
              position: 'absolute',
              top: 64,
              left: 256,
              right: 0,
              bottom: 0,
            }}
            dangerouslySetInnerHTML={{
              __html: md.render(this.props.content)
            }}>
          </div>
        </div>
      </body>
      </html>
    )
  }
}

module.exports = Tutorial;