'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('sa_custom_styles', [
        {
            "SCZ_ID": 18,
            "SCZ_LOGO_MIMETYPE": "image/jpeg",
            "SCZ_LOGO_NAME": "logo-1536917089007-GioialuxLogo.jpg",
            "SCZ_SU_ID": 41,
            "SCZ_THEME": "orange-theme"
        },
        {
            "SCZ_ID": 19,
            "SCZ_LOGO_MIMETYPE": "image/png",
            "SCZ_LOGO_NAME": "logo-1536951979633-grsrl_home.png",
            "SCZ_SU_ID": 42,
            "SCZ_THEME": "red-theme"
        },
        {
            "SCZ_ID": 20,
            "SCZ_LOGO_MIMETYPE": "image/jpeg",
            "SCZ_LOGO_NAME": "logo-1536952085179-Manutenzione_slider.jpg",
            "SCZ_SU_ID": 43,
            "SCZ_THEME": "blue-theme"
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('sa_custom_styles', null, {});
  }
};
