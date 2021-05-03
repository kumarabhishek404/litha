/**
 * renders pdf attachment on to the chat screen
 * @param {Object} pdf_data json object
 */
function renderPdfAttachment(pdf_data) {
    const { url: pdf_url } = pdf_data.custom;
    const { title: pdf_title } = pdf_data.custom;
    const pdf_attachment = `<div className="pdf_attachment"><div className="row"><div className="col s3 pdf_icon">
<i className="fa fa-file-pdf-o" aria-hidden="true"></i></div><div className="col s9 pdf_link"><a href="${pdf_url}" target="_blank">
${pdf_title} </a></div></div></div>`;

    $(".chats").append(pdf_attachment);
    scrollToBottomOfResults();
}
