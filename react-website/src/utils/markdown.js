import marked from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

/**
 * 将 markdown 格式字符串解析成 html 格式字符串
 * @param {*} markdownStr 
 * @returns {String}
 */
function markdownToHtml (markdownStr) {
  return marked(markdownStr);
}

export default markdownToHtml;