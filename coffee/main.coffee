###
* Scripts
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
###

require "jquery"

$ ->
  $main = $ '.acardeon'
  $items = $main.find 'li'
  $trigger = $items.find '.trigger'

  $trigger.click (e) ->
    $parent = $(@).parent()

    do e.preventDefault

    if(!$parent.hasClass('active'))
      $items.find('.text').slideUp()
      $items.removeClass('active')
      $parent.addClass('active')
      $parent.find('.text').slideDown()
