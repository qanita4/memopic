$(function() {
  $("#profileIcon").on('click', function(e) {
    e.stopPropagation();
    $("#profileDropdown").toggle();
  });

  $(window).on('click', function() {
    $("#profileDropdown").hide();
  });

  $("#logoutLink").on('click', function(e) {
    e.preventDefault();
    alert("Logout berhasil!");
    // TODO: Implement actual logout
    window.location.href = "login.html";
  });
});
