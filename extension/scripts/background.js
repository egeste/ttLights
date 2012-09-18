var regex = /https?:\/\/turntable\.fm\/(?!lobby\/?|static\/?|settings\/?|getfile\/?|down\/?|about\/?|terms\/?|privacy\/?|copyright\/?|jobs\/?|admin\/?).+/i
var checkTab = function(tabId, changeInfo, tab) {
  if (regex.test(tab.url)) {
    chrome.pageAction.show(tabId)
    chrome.tabs.executeScript(tabId, {
      file: "scripts/inject.js"
    })
  }
}

chrome.tabs.onUpdated.addListener(checkTab)
chrome.windows.getAll({ populate: true }, function (windows) {
  for (var i = 0; i < windows.length; i++) {
    var tabs = windows[i].tabs
    for (var t = 0; t < tabs.length; t++) {
      var tab = tabs[t]
      checkTab(tab.id, null, tab)
    }
  }
})
