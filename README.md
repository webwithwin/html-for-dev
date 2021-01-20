* HTML for faster development using:
``
gulp
``
Which includes:  
- browser sync (live reloading)  
- gulp (build task)   
- gulp-file-include (include HTML inside HTML)

* Versioning CSS file for cache issue when deploy to production using:  
``
gulp build
``
Which includes:  
- gulp-rev ( Revision your assets and create an asset manifest )
- gulp-rev-rewrite (Collect the revisioned paths from the manifest and rewrite references to them)
