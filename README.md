Mynute
======

This is a _minimal_ Sinatra app created for tracking time.  Mynute provides
a simple, single page UI, for entering and viewing your time.  It's designed for a
single user and persists data to a sqlite database.  You can also export
your entered time to CSV.  Mynute can be hosted locally
or on heroku.  Currently, it's secured using HTTP basic auth, but I plan to
add support for warden in a future version.

![Screenshot of Mynute](http://github.com/ecavazos/mynute/raw/master/public/images/mynute_ss.png)

Setup
-----

There aren't any screens available for managing user, client or project data.
There is, however, a *db/seeds.rb* file and a rake task that you can use for seeding
a fresh install.

TODO
----

* Add UI enhancements (aka images)
  * logo
  * add time
  * edit
  * delete
  * messages
* Add warden authentication
* Add team support
* Display errors closer to the user event that caused the error
* Add user defined sorting
* DRY SASS
