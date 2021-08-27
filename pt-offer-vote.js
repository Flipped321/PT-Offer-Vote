// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chdbits.co/offers.php
// @icon         https://www.google.com/s2/favicons?domain=chdbits.co
// @grant        none
// ==/UserScript==

function vote (request, url) {
  request.open('GET', url, false)
  request.send()
}
function startVote() {
  alert('开始投票')
  const nodes = document.querySelectorAll("[title='我要！']")
  const request = new XMLHttpRequest()

  Object.keys(nodes).forEach(element => {
      vote(request, nodes[element].href)
  })
  alert('投票完成')
}

function createVoteOffer() {
  let offerTitle = document.querySelector('h2')
  let voteOffer = document.createElement('span')
  voteOffer.innerHTML = '全部投是'
  voteOffer.style = "padding-left: 20px;cursor: pointer;color: red"
  voteOffer.addEventListener('click', function(){
      startVote()
  })
  offerTitle.appendChild(voteOffer)
}

createVoteOffer()