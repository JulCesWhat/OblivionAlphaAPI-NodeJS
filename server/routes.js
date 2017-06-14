import contactRouter from './api/contact/router'
import examplesRouter from './api/examples/router';
import newsGaloreRouter from './api/newsGalore/router';;

export default function routes(app) {
    app.use('/api/v1/contact', contactRouter);
    app.use('/api/v1/examples', examplesRouter);
    app.use('/api/v1/newsGalore', newsGaloreRouter);

    // Will need to check this.
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use((err, req, res) => {
      res.status(err.status || 500);

      res.json({
        dataContent: null,
        errorContent: {
          anyErrors: true,
          errors: [{
            errorMessage: err.message,
            errorStatus: err.status
          }]
        }
      });
    });  
};