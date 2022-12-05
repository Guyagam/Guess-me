'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.restart').click(onRestartGame)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  $('.game-start').hide()
  renderQuest()
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest()
  $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest').hide('slow')
      $('.alert').show('slow')
      $('.restart').show('slow')
      // alert('Yes, I knew it!')

      $('alert-success').css('display', 'block')
    } else {
      alert('I dont know...teach me!')
      $('.quest').hide('slow')
      $('.new-quest').show('slow')
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  addGuess(newQuest, newGuess, gLastRes)
  //להכניס את הערכים ולשמור
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  $('.alert').hide()

  gLastRes = null
  init()
}
