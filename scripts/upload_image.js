$(function () {
    var textVal = $("#tex").val();
    // Initialize the number of picture
    $(".imgNumber").text("0/4");
    // Upload a image
    var imgArr = [];
    var res = "";
    $("#upload_image").change(function (event) {
      var files = event.target.files,
        file;
      var filePath = $(this).val(),
        fileFormat = filePath
          .substring(filePath.lastIndexOf("."))
          .toLowerCase(); //get document's type

      if (files && files.length > 0) {
        file = files[0];
        if (file.size > 1024 * 1024 * 5) {
          toast("Image cannot be over 5MB!");
          return false;
        }
        if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
          toast("Error! You image has to be png/jpg/jpeg");
          return false;
        }

        var URL = window.URL || window.webkitURL;

        var imgURL = URL.createObjectURL(file);
        var strs = imgURL.substring(27);
        let imgageDom =
          "<div style='position:relative'  class='image' id='" +
          strs +
          "'  ><img  src='" +
          imgURL +
          "'  /> <svg data-src='" +
          imgURL +
          "'  t='1661306388955' class='icon'  id='close' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='25663' width='64' height='64'><path  id='close' data-src='" +
          imgURL +
          "'  d='M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 64C311.701333 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333z m182.997333 179.669334a30.72 30.72 0 0 1 0 43.456l-139.52 139.52 139.52 139.562666a30.72 30.72 0 1 1-43.456 43.456l-139.52-139.562666-139.562666 139.562666a30.72 30.72 0 1 1-43.456-43.456L468.565333 512l-139.562666-139.52a30.72 30.72 0 1 1 43.456-43.456L512 468.522667l139.52-139.52a30.72 30.72 0 0 1 43.456 0z' fill='#bfbfbf' p-id='25664'></path></svg></div>";

        // Look of your images
        $(".box").before(imgageDom);
        $(".imgNumber").text($(".img_box").children(".image").length + "/4");
        // No more than 4 images
        $(".img_box").children(".image").length >= 4
          ? $(".box").hide()
          : $(".box").show();
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          imgArr.push(reader.result);
          res = reader.result;
          let index = $(".img_box .image svg").last().attr("index", res);
        };
      }
      $("#upload_image").val("");
    });
    // Submit
    $(".btn").click(function () {
      let params = {};
      $("#phone").val() ? (params.phoneNo = $("#phone").val()) : "";
      $("#tex").val() ? (params.msg = $("#tex").val()) : "";
      imgArr[0] ? (params.pic1 = imgArr[0]) : "";
      imgArr[1] ? (params.pic2 = imgArr[1]) : "";
      imgArr[2] ? (params.pic3 = imgArr[2]) : "";
      imgArr[3] ? (params.pic4 = imgArr[3]) : "";
      // User ajax to upload the data
      // ajax(params);
    });
    // delete images uploaded
    $(".img_box").on("click", "#close", (e) => {
      console.log("123", e.target);
      let src = $(e.target).attr("data-src");
      let index = $(e.target).attr("index");
      const images = $(".img_box").find("div");
      let id = src.substring(27);
      var delBox = document.getElementById(id);
      delBox.remove(delBox);
      imgArr.splice(imgArr.indexOf(index), 1);
      $(".imgNumber").text($(".img_box").children(".image").length + "/4");
      // No more than 4 images
      $(".img_box").children(".image").length >= 4
        ? $(".box").hide()
        : $(".box").show();
    });

    function ajax(data) {
      var isLoading = true;
      var loadNum = 0;
      $.ajax({
        type: "POST",
        data: data,
        url: "",
        dataType: "json",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (d) {
          console.log("Success!", d);
          if (d.result == "000") {
            successfn(d);
          } else {
            console.log(d);
            if (typeof errorfn === "function") {
              errorfn("success", d);
            } else {
              // $.toast(d.msg);
            }
          }
        },
        error: function (e) {
          console.log("Fail to upload!", e);
          if (typeof errorfn === "function") {
            errorfn("error", e);
          } else {
            // toast("Error");
            console.log(e);
          }
        },
      });
    }
  });