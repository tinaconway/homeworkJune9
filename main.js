$(document).ready(function() {
  page.init();
});




var page = {
  init: function (arguments) {
    page.initEvents();
  },

  initEvents: function (arguments) {




    // displaying and hiding different pages by clicking the navigation //
    $('.rowTop').on('click', 'a', function (event) {
      event.preventDefault();
      var clickedPage = $(this).attr('rel');
      $(clickedPage).siblings().removeClass('active');
      $(clickedPage).addClass('active');
    });


    // REPO TEMPLATE //
    var refinedRepo = _.map(repoData, function(el) {
      return {
        name: el.name,
        language: el.language,
        stargazers: el.stargazers_count,
        forks: el.forks,
        updated: el.updated_at
      };
    });

    var repoTmpl = _.template($('#repos').html());


    _.each(refinedRepo, function (el) {
    $('.repositories').append(repoTmpl(el));

    });

    // ACTIVITY TEMPLATE //

    var refinedAct = _.map(activityData, function(el) {
      return {
        type: el.type,
        branch: el.payload.master_branch,
        name: el.repo.name,
        time: el.created_at,
        ref: el.payload.ref_type,
        login: el.payload.login
      };

    });

    var actTmpl = _.template($('#activityFeed').html());


    _.each(refinedAct, function (el) {
    $('.activities').append(actTmpl(el));

    });


 // SOCIAL TEMPLATE //

    var refinedSocial = {
      followers: socialData.followers,
      starred: socialData.public_gists,
      follow: socialData.following
    };

    var socialTmpl = _.template($('#follows').html());

    $('.social').append(socialTmpl(refinedSocial));




  }
};
