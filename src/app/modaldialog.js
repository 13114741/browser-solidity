var yo = require('yo-yo')
var csjs = require('csjs-inject')

var css = csjs`
.scroller {
    position: absolute;
    z-index: 999;
    text-align: center;
    cursor: pointer;
    display: none;
    padding: 0 0.9em;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.8);
    height: 100%;
    font-size: 1.3em;
}

.scroller i {
    line-height: 3em;
}

.scroller-right {
    right: 0;
}

.scroller-left {
    left: 0;
}

#files {
    list-style: none;
    margin: 0;
    font-size: 15px;
    height: 2.5em;
    box-sizing: border-box;
    line-height: 2em;
    padding: 0.5em 0 0;
    position: relative;
    left: 40px;
    top:0;
    min-width:3000px;
    border-bottom: 0 none;
}
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Sit on top of everything including the dragbar */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .modalHeader {
    padding: 2px 16px;
    background-color: orange;
    color: white;
  }
  .modalBody {
    padding: 1.5em;
    line-height: 1.5em;
  }
  .modalFooter {
    padding: 10px 30px;
    background-color: orange;
    color: white;
    text-align: right;
    font-weight: 700;
    cursor: pointer;
  }
  .modalContent {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    line-height: 18px;
    font-size: 13px;
    border: 1px solid #888;
    width: 50%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }
  .modalFooterOk {
    cursor: pointer;
  }
  .modalFooterCancel {
    cursor: pointer;
  }
  @-webkit-keyframes animatetop {
    from {top: -300px; opacity: 0} 
    to {top: 0; opacity: 1}
  }
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
`

module.exports = (title, content, ok, cancel) => {
  var container = document.querySelector(`.${css.modal}`)
  if (!container) {
    document.querySelector('body').appendChild(html())
    container = document.querySelector(`.${css.modal}`)
  }

  var okDiv = document.getElementById('modal-footer-ok')
  okDiv.innerHTML = (ok && ok.label !== undefined) ? ok.label : 'OK'

  var cancelDiv = document.getElementById('modal-footer-cancel')
  cancelDiv.innerHTML = (cancel && cancel.label !== undefined) ? cancel.label : 'Cancel'

  var modal = document.querySelector(`.${css.modalBody}`)
  var modalTitle = document.querySelector(`.${css.modalHeader} h2`)

  modalTitle.innerHTML = ''
  if (title) modalTitle.innerHTML = title

  modal.innerHTML = ''
  if (content) modal.appendChild(content)

  container.style.display = container.style.display === 'block' ? hide() : show()

  function okListener () {
    hide()
    if (ok && ok.fn) ok.fn()
    removeEventListener()
  }

  function cancelListener () {
    hide()
    if (cancel && cancel.fn) cancel.fn()
    removeEventListener()
  }

  function hide () {
    container.style.display = 'none'
  }

  function show () {
    container.style.display = 'block'
  }

  function removeEventListener () {
    okDiv.removeEventListener('click', okListener)
    cancelDiv.removeEventListener('click', cancelListener)
  }

  okDiv.addEventListener('click', okListener)
  cancelDiv.addEventListener('click', cancelListener)
}

function html () {
  return yo`<div id="modal-dialog" class="${css.modal}" onclick="clickModal()" >
  <div class="${css['modalContent']}">
    <div class="${css['modalHeader']}">
    <h2></h2>
  </div>
  <div class="${css['modalBody']}"> - 
  </div>
  <div class="${css['modalFooter']}">
    <span id="modal-footer-ok" class="modalFooterOk">OK</span><span id="modal-footer-cancel" class="modalFooterCancel">Cancel</span>
        </div>
  </div>
  </div>
  </div>`
}
