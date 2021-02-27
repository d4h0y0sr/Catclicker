$(function () {
  // Var declarations

  var model = {
    init: function () {
      if (!localStorage.cats) {
        localStorage.cats = JSON.stringify([]);
        ["Fabio", "Chewie", "Peter", "Lizzy", "Sofy"].forEach((cat) => {
          this.add({
            name: cat,
            folder: cat + ".jpg",
            count: 0,
          });
        });
      }
    },

    add: function (obj) {
      var data = JSON.parse(localStorage.cats);
      data.push(obj);
      localStorage.cats = JSON.stringify(data);
    },

    updateCounter: function (cat) {
      var data = JSON.parse(localStorage.cats);
      data[cat].count++;
      localStorage.cats = JSON.stringify(data);
    },

    getAllCats: function () {
      return JSON.parse(localStorage.cats);
    },
  };

  var octopus = {
    selectedCat: 0,

    init: function () {
      model.init();
      selectView.init();
      catView.init();
    },

    updatecounter: function () {
      model.updateCounter(this.selectedCat);
    },

    setcurrentCat: function (num) {
      this.selectedCat = num;
      catView.render();
    },

    getcurrentCat: function () {
      return this.getAllCats()[this.selectedCat];
    },

    getAllCats: function () {
      return model.getAllCats();
    },
  };

  var selectView = {
    init: function () {      
      this.render();
    },

    render: function () {
      octopus.getAllCats().forEach(function (cat, index) {
        var catItem = document.createElement("li");
        catItem.id = cat.name;
        catItem.innerHTML = cat.name;
        catItem.addEventListener("click", function () {
          octopus.setcurrentCat(index);
        });

        $("#select").append(catItem);

      });
      
    },
  };

  var catView = {
    init: function () {
      this.catProfile = $("#catView");
      this.render();
    },
    render: function () {
      var cat = octopus.getcurrentCat();

      var htmlStr =
        ' <img src="resources/' +
        cat.folder +
        '" id="catImg" alt="Cat"> <br> <label>' +
        cat.name +
        '</label><p><label>You have clicked: </label><label id="count">' +
        cat.count +
        " times.</label></p>";
      this.catProfile.html(htmlStr);

      this.catImg = $("#catImg");
      this.catImg.click(function () {
        octopus.updatecounter();
        catView.render();
      });
    },
  };
  /*
    var catnames = ["Fabio","Chewie","Peter","Lizzy","Sofy"];    
    var counters=[0,0,0,0,0];  
    var selectedCat=0;

    // element extraction
    var ul= document.getElementById('select');
    var catImg = document.getElementById('catImg');
    
    
    //Listener Clic
    catImg.addEventListener('click', function () {                
            counters[selectedCat]++;           
            document.getElementById('count').innerHTML = counters[selectedCat];
        }, false);

    for (var i = 1; i <= catnames.length; i++) {        
        
        var catItem = document.createElement("li");
        catItem.innerHTML=catnames[i-1];
        const index=i-1;

        catItem.setAttribute("id",index);      
       
        catItem.addEventListener('click',function(){
            console.log(catnames[index]);
            selectedCat=index;
            document.getElementById("catImg").setAttribute("src",catnames[index]+".jpg"); 
            document.getElementById("catName").innerHTML=catnames[index]; 
            document.getElementById('count').innerHTML = counters[selectedCat];
        });

        ul.appendChild(catItem);

        
    }
*/

  octopus.init();
});
