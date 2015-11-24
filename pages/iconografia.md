---
template: post.html
title: Iconografia
published: true
---

<div class="lg-callout lg-callout-must">
<mark>SI DEVE</mark> Quando si utilizzano delle icone è necessario assicurare una chiara comprensione del loro significato. Pertanto ogni icona dovrà essere associata a un tooltip che ne chiarisca l’azione. La stessa icona non deve essere utilizzata per indicare azioni diverse all’interno della stesso sito. 
</div>

Al fine di garantire una coerenza visiva si consiglia di utilizzare icone provenienti da un unico set grafico come, ad esempio, quelle disponibili gratuitamente su [Font Awesome](https://fortawesome.github.io/Font-Awesome/). 

<!-- La dimensione minima di un'icona è di 30dp -->
<!-- ![](/images/tavola_31.png) -->

Il framework CSS Bootstrap incorpora invece le [icone del set glyphicons](http://glyphicons.com/).
É opportuno utilizzare solo icone e immagini che siano realmente necessari alla comprensione delle informazioni da parte dell'utente. Evitare elementi decorativi non essenziali.

### Badge

```markup
<p>Commenti <span class="badge">4</span></p>
```

```markup
<ul class="nav nav-pills" role="tablist">
  <li role="presentation" class="active"><a href="#">Home <span class="badge">42</span></a></li>
  <li role="presentation"><a href="#">Profilo utente</a></li>
</ul>
```

```markup
<i class="ita-colore-blu-italia-50 glyphicon glyphicon-camera badge-container">
  <span class="badge">4</span>
</i>
<i class="ita-colore-blu-italia-50 glyphicon glyphicon-facetime-video badge-container">
  <span class="badge">4</span>
</i>
<i class="ita-colore-blu-italia-50 glyphicon glyphicon-picture badge-container">
  <span class="badge">4</span>
</i>
```

<!-- ![html](/images/tavola_32.png) -->
