var WebFont = require('webfontloader');


class App {
    public webFontsLoaded: Boolean = false;
    private _startTime: number;

    constructor() {
        this._startTime = Date.now();
    }

   initialStartGame(): void {
        const now = Date.now();
        console.log("Time to call initialStartGame " + (now - this._startTime) + " ms");
    }
}

const app = new App();


/// #if WEBFONTLOADER
WebFont.load({
    // NOTE: If I don't have include the google key, this won't work
    google: {
        families: ['Pacifico' ]
    },
    // NOTE: Comment out `custom` and compare start time
    custom: {
        families: [ 'Roboto', 'Bowlby One SC'],
        urls: [
            'assets/Roboto-Regular.ttf',
            'assets/BowlbyOneSC-Regular.ttf'
        ]
    },
    active: function() {
        app.webFontsLoaded = true;
        app.initialStartGame();
    }
});

/// #else

(() => {
    return new Promise((resolve, rej) => {
        const fontsList = [
            new FontFace('Bowlby One SC', 'url(assets/BowlbyOneSC-Regular.ttf)' ),
            new FontFace('Roboto', 'url(assets/Roboto-Regular.ttf)')
        ];
        fontsList.forEach(fonts => {
            fonts.load().then(function(loadedFontFace) {
                (document as any).fonts.add(loadedFontFace);
            });
        });
        (document as any).fonts.ready.then(() => {
            app.webFontsLoaded = true;
            app.initialStartGame();
        });
    });
})();

/// #endif


