define(function (require) {
    var jstz = require('jstz');

    var timezone = jstz.determine();
    var tz_region = timezone ? timezone.name() : 'America/Phoenix';

    return {
        API_ROOT: window.API_ROOT || '/api/v1',
        API_V2_ROOT: window.API_V2_ROOT || '/api/v2',
        API_V2_MOCK_ROOT: window.API_V2_MOCK_ROOT,
        SITE_TITLE: window.SITE_TITLE || 'Atmosphere',
        SITE_FOOTER: window.SITE_FOOTER || 'iPlant Collaborative',
        UI_VERSION: window.UI_VERSION || 'Hawaiian Hawk',
        TZ_REGION: tz_region,
        BADGE_HOST: window.BADGE_HOST,
        BADGE_IMAGE_HOST: window.BADGE_IMAGE_HOST,
        BADGES_ENABLED: window.BADGES_ENABLED || true
        
    }

});
