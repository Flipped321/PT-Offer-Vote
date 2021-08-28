// ==UserScript==
// @name         PT-Offer-Vote
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  主要用于PT站的候选投票
// @author       Flipped
// @icon         https://www.google.com/s2/favicons?domain=chdbits.co
// @grant        none
// @updateUrl    https://github.com/Flipped321/PT-Offer-Vote/blob/master/pt-offer-vote.js
// @include      https://chdbits.co/offers.php
// @include      https://pt.btschool.club/offers.php
// @include      https://totheglory.im/viewoffers.php
// ==/UserScript==
function voteTTG() {
  const nodes = Array.from(document.getElementsByTagName('a')).filter(node => node.innerHTML === '支持')
  nodes.forEach(element => element.click())
}

function voteOther() {
  const nodes = document.querySelectorAll("[title='我要！']")
  const request = new XMLHttpRequest()
  Object.keys(nodes).forEach(element => {
    // 同步执行
    request.open('GET', nodes[element].href, false)
    request.send()
  })
}

function startVote() {
  alert('点击确定开始投票')
  isTTG? voteTTG(): voteOther()
  const EndNotice = `投票完成。${isTTG? '如果稍后弹出大量弹窗提示已投过票，关闭浏览器tab页即可': ''}`
  alert(EndNotice)
}

function createVoteOffer() {
  let offerTitle = isTTG? document.querySelector('h1'): document.querySelector('h2')
  let voteOffer = document.createElement('span')
  voteOffer.innerHTML = `全部${isTTG? '支持': '投是'}`
  voteOffer.style = "padding-left: 20px;cursor: pointer;color: red"
  voteOffer.addEventListener('click', function(){
      startVote(isTTG)
  })
  
  offerTitle.appendChild(voteOffer)
}

function startScript() {
  // TTG与普通NP略有差别
  const domain = document.domain
  isTTG = domain.indexOf('totheglory') !== -1

  createVoteOffer()
}


let isTTG = false
startScript()