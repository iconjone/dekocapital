function portfolio(portfolioElementId, portfolioFilterElementId, gid){
var elementAdd = document.getElementById(portfolioElementId)
var filterAdd = document.getElementById(portfolioFilterElementId)
  var url = "https://cors-anywhere.herokuapp.com/https://spreadsheets.google.com/feeds/cells/" + gid + "/default/public/basic?alt=json&min-row=1&min-col=1&max-col=6";
  fetch(url)
    .then(function(response) {
      console.log(response)
      return response.json();
    })
    .then(function(myJson) {
      console.log("this ran here")
      console.log(myJson);
      entryArrays = myJson.feed.entry;
      ite = 0;
      categories = []
      entryArrays.forEach(function(entry) {
        if (ite % 6 == 0 && ite >= 6) {
          console.log(entryArrays[ite + 3].content['$t'])
            elementAdd.appendChild(createPortfolioElement(entryArrays[ite].content['$t'],entryArrays[ite + 1].content['$t'],entryArrays[ite + 2].content['$t'],entryArrays[ite + 3].content['$t'],entryArrays[ite + 4].content['$t'],entryArrays[ite + 5].content['$t']))
            if(!categories.includes(entryArrays[ite + 5].content['$t'])){
            //  console.log(filterAdd)
            filterAdd.appendChild(createFilterButton(entryArrays[ite + 5].content['$t']))
            categories.push(entryArrays[ite + 5].content['$t'])
          }
        }
        ite++
      })
    }).then(function(){

console.log("elemnts have been loaded into dom")
console.log("came here")
      var statFilter = 'StatAll'
      var filter = 'all'
            $(".filter-button , .filter-button-stat").click(function(){
                  var value = $(this).attr('data-filter');
                  filterSelector = ''
                  if(value == 'StatAll' || value == 'realized' || value == 'active'){
                      if(filter != 'all')
                        filterSelector = filterSelector + "[" + filter + "]"
                          //filterSelector = filterSelector + "[" + value + "] [" + statFilter + "]"
                      if(value != 'StatAll'){
                        filterSelector = filterSelector + "[" + value + "]"
                        statFilter = value;
                      }
                      else
                      statFilter = "StatAll"
                  }
                  else{
                    if(statFilter != 'StatAll')
                      filterSelector = filterSelector + "[" + statFilter + "]"
                        //filterSelector = filterSelector + "[" + value + "] [" + statFilter + "]"
                    if(value != 'all'){
                      filterSelector = filterSelector + "[" + value + "]"
                      filter = value;
                    }
                    else
                      filter = 'all'
                  }
console.log("get's here")
                  if(filterSelector == ''){
                  $('#portfolioContainer #portfolioElement').show('1000');
                  $('.filter-button').removeClass('active')
                  $('.filter-button-all').addClass('active')
                }
                  else {
                    $('#portfolioContainer #portfolioElement').filter(filterSelector).show('1000');
                    $('#portfolioContainer #portfolioElement').not(filterSelector).hide('3000')
                    $('.filter-button').removeClass('active')
                    if(filter == 'all')
                      $('#allBtn').addClass('active')
                    if(statFilter == "StatAll")
                      $('#allStatusBtn').addClass('active')
                    if(filter != 'all')
                    $('.filter-button[data-filter="'+filter +'"]').addClass('active')
                    if(statFilter != 'StatAll')
                    $('.filter-button[data-filter="'+statFilter +'"]').addClass('active')
                  }
                  // $('div ['+value = ']').show('1000');
                  // $('.filter').not('.'+statFilter).hide('3000')
                  console.log(filterSelector)
            })

    })
console.log("then here")

}



function createPortfolioElement(name ,about, imgUrl, website, status, category){
  var retPortfolioElement = document.createElement('div')
  retPortfolioElement.setAttribute('id', 'portfolioElement')
  retPortfolioElement.setAttribute("data-toggle","modal")
  retPortfolioElement.setAttribute("data-target","#portModal")
  retPortfolioElement.setAttribute("data-name",name)
  retPortfolioElement.setAttribute("data-about",about)
  retPortfolioElement.setAttribute("data-img",imgUrl)
    retPortfolioElement.setAttribute("data-web",website)
  retPortfolioElement.setAttribute(status,"")
  retPortfolioElement.setAttribute(category,"")
  aLink = document.createElement('a')
  aLink.className = 'work-thumb'
  divWorkText = document.createElement('div')
  divWorkText.className = 'work-text'
  nameElement = document.createElement("h5")
  nameElement.innerHTML = name
  imgElement = document.createElement('img')
  imgElement.setAttribute("src", imgUrl)
  imgElement.className = "img-responsive"

  divWorkText.appendChild(nameElement)
  aLink.appendChild(divWorkText)
  aLink.appendChild(imgElement)
  retPortfolioElement.appendChild(aLink)


  return retPortfolioElement



}

function createFilterButton(filter){
  retBtn = document.createElement('button')
  retBtn.className = "btn filter-button"
  retBtn.setAttribute('data-filter', filter)
  retBtn.innerHTML = filter
  return retBtn
}

$('#portModal').on('show.bs.modal', function (event) {
  var port = $(event.relatedTarget) // Button that triggered the modal
  var name = port.data('name') // Extract info from data-* attributes
  var about = port.data('about') // Extract info from data-* attributes
  var date = port.data('date') // Extract info from data-* attributes
    var imgUrl = port.data('img') // Extract info from data-* attributes
        var website = port.data('web') // Extract info from data-* attributes

  // retPortfolioElement.setAttribute("data-toggle","modal")
  // retPortfolioElement.setAttribute("data-target","#portModal")
  // retPortfolioElement.setAttribute("data-name",name)
  // retPortfolioElement.setAttribute("data-about",about)
  // retPortfolioElement.setAttribute("data-imgUrl",imgUrl)
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('#portModalTitle').text(name)
  modal.find('#portModalText').html(about)
  document.getElementById('portModalImg').setAttribute("src",imgUrl)
  document.getElementById('portModalBtn').setAttribute('href',website)


})
