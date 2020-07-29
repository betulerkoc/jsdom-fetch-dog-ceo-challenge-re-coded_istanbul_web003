console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
   
    const dogList = document.getElementById("dog-breeds");
    const dropDown = document.getElementById("breed-dropdown");


    dropDown.addEventListener("change", function() {
        let selectedItem = dropDown.options[dropDown.selectedIndex].text;
        console.log(selectedItem)
        document.getElementById('dog-breeds').innerHTML = ""
        fetchDogNames(selectedItem);
    })
    

    dogList.addEventListener("click",function(e) {
        e.target.classList.add("styledBackground");
    });

    fetchDogImages();
    fetchDogNames("a");

  })

function fetchDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderDogImages(json.message));
  }

function fetchDogNames(filterSelectedItem) {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(function(json) {

        const willFilter = Object.keys(json.message);

        willFilter.filter((obj) => {
        let isThere = false;
        
           if(Object.values(obj)[0] !== filterSelectedItem) {
                isThere = true;
                return;
           }
           if(isThere) return obj;
           //console.log(obj)
           renderDogNames(obj);
          });
      });
  }

function renderDogImages(dogs) {
    const dogImages = document.getElementById('dog-image-container')
    for (const dog of dogs) {
        const img = document.createElement('img')
        img.setAttribute("src", dog);
        img.setAttribute("width", "304");
        img.setAttribute("height", "228");
        dogImages.appendChild(img)
    }
}

function renderDogNames(dog) {
    const dogNames = document.getElementById('dog-breeds')

    const li = document.createElement('li')
        li.innerHTML = dog
        dogNames.appendChild(li)
}


