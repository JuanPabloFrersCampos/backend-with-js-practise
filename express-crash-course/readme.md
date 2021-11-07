Important concepts:

Middleware:
Functions that execute during a request/response to/from the Express erver.

Static folder/static files:
Static files are files that clients download as they are from the server.
Static file serving is done in express by using the express.static() middleware. This middleware will look on the disk for the files you are presumably asking for, and if found will serve them by writing http headers and then the content