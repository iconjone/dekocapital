function news(carouselElementId, gid){
var elementAdd = document.getElementById(carouselElementId)
  var url = "https://cors-anywhere.herokuapp.com/https://spreadsheets.google.com/feeds/cells/" + gid + "/default/public/basic?alt=json&min-row=1&min-col=1&max-col=3";
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
      timeline = document.getElementById('timelineAppend')
      entryArrays.forEach(function(entry) {
        if (ite % 3 == 0 && ite >= 3) {
          console.log(elementAdd)
            elementAdd.appendChild(createServiceElements(entryArrays[ite + 1].content['$t'],entryArrays[ite + 2].content['$t'],entryArrays[ite + 1].content['$t']))
        }
        ite++
      })
    }).then(function(){

      if ( $('.nonloop-block-14').length > 0 ) {
        $('.nonloop-block-14').owlCarousel({
          center: false,
          items: 1,
          loop: true,
          stagePadding: 0,
          margin: 0,
          autoplay: true,
          smartSpeed: 800,
          nav: true,
          navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
          responsive:{
            600:{
              margin: 20,
              nav: true,
              items: 2
            },
            1000:{
              margin: 30,
              stagePadding: 0,
              nav: true,
              items: 3
            },
            1200:{
              margin: 30,
              stagePadding: 0,
              nav: true,
              items: 4
            }
          }
        });
      }


    })
console.log("then here")

}



function createServiceElements(title, text, date){
  var retServiceElement = document.createElement('div')
  retServiceElement.className = "service"
  retServiceElement.setAttribute("data-toggle","modal")
  retServiceElement.setAttribute("data-target","#newsModal")
  retServiceElement.setAttribute("data-title",title)
  retServiceElement.setAttribute("data-text",text)
  retServiceElement.setAttribute("data-date",date)
  var innerDivShell = document.createElement('div')
  var titleService = document.createElement('h3')
  titleService.innerHTML = title
  var dateService = document.createElement('h5')
  dateService.innerHTML = date
  var serviceBody = document.createElement('p')
  if(text.length < 100){
    serviceBody.innerHTML = text
  }
  else {
    serviceBody.innerHTML = text.substring(0,100) + "... Click to read more!"
  }
  innerDivShell.appendChild(titleService)
  innerDivShell.appendChild(dateService)
  innerDivShell.appendChild(serviceBody)
  retServiceElement.appendChild(innerDivShell)

  return retServiceElement



}

$('#newsModal').on('show.bs.modal', function (event) {
  var service = $(event.relatedTarget) // Button that triggered the modal
  var title = service.data('title') // Extract info from data-* attributes
  var text = service.data('text') // Extract info from data-* attributes
  var date = service.data('date') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('#newsModalTitle').text(title)
  modal.find('#newsModalDate').text(date)
  modal.find('#newsModalText').text(text)

})
