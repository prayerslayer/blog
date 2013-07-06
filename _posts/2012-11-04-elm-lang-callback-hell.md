---
layout: singlepost
title: "Elm Lang & The Callback Hell"
---

[Elm](http://elm-lang.org/learn/Escape-from-Callback-Hell.elm):

> If you have worked with AJAX or node.js or any other callback heavy framework, you have probably been to Callback Hell. Your whole application ends up being passed around as callbacks, making the code extremely difficult to read and maintain. The resulting tangled mess of code is often pejoritively called spaghetti code, a term borrowed from the days of goto.

Offensichtlich findet der Autor von Elm Callbacks beschissen. Er untermauert seine Argumente mit folgendem Snippet:

~~~ javascript
function getPhoto(tag, handlerCallback) {
    asyncGet(requestTag(tag), function(photoList) {
        asyncGet(requestOneFrom(photoList), function(photoSizes) {
            handlerCallback(sizesToPhoto(photoSizes));
        });
    });
}

getPhoto('tokyo', drawOnScreen);
~~~

Und in der Tat, so sieht die Callback Hölle aus. Ich war dort. Und aus eingangs erwähnten Gründen sieht guter JS Code so **nicht** aus. Ein Framework, welches einen zwingt, die Applikation in Model, View und noch was aufzuteilen (z.B. [Backbone](http://backbonejs.org/)), hilft schon sehr viel. Oder, wenn das Overkill ist, Javascript Promises einsetzen ([Elm Beispiel mit Promises]( /promise-elm )):

~~~ javascript
var deferred_photos = requestTag( tag );
var deferred_photo = requestOneFrom( deferred_photos );
drawOnScreen( deferred_photo );
~~~

Der Code ist jetzt mindestens so gut zu lesen wie die Lösung in Elm:

~~~ elm
getPhotos tags =
    let photoList  = send (lift requestTag tags) in
    let photoSizes = send (lift requestOneFrom photoList) in
        lift sizesToPhoto photoSizes
~~~

Trotzdem hat Javascript gegenüber Elm einen Nachteil. `requestOneFrom` sieht generisch aus, erwartet aber, dass der Input

1. ein jQuery Deferred Objekt ist,
2. irgendwann aufgelöst wird und dann
3. Fotos via der Flickr API abgerufen hat.

Das sind gleich drei implizite Abhängigkeiten. Vergleichen wir das mit Elm. Dort will die Methode Fotos von der Flickr API als Input. Also genau das Interface, was ich erwartet hätte.

Bottom line: Der Code in Elm ist wiederverwendbarer als in Javascript *, auch wenn das Eingangsbeispiel nicht der Realität entspricht (/update)*. Lesbarer würde ich gar nicht unbedingt als Argument bringen, siehe etwas komplexeres Elm:

~~~ elm
requestOneFrom photoList =
let { getPhotoID json =
      case findArray "photo" (findObject "photos" json) of
      { (JsonObject hd) : tl -> findString "id" hd ; _ -> "" }
  ; requestSizes id = if id == "" then "" else
                          concat [ flickrRequest
                                 , "&method=flickr.photos.getSizes&photo_id=", id ]
  }
in  get (requestSizes (getPhotoID (extract photoList)))
~~~