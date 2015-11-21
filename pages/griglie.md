---
template: post.html
title: Griglie
published: true
---



All’interno dello spazio a disposizione l’organizzazione del contenuto deve essere strutturata seguendo un sistema di griglie responsive per mantenere una coerente esperienza utente. La griglia rappresenta la struttura invisibile che permette di organizzare i contenuti della pagina.

Una griglia di impaginazione consiste in colonne di testo (o immagini) separate da spazi intercolonna e contornate dai margini della pagina. Le dimensioni delle colonne della griglia saranno flessibili in funzione della viewport. 

<div class="table-responsive">
<table>
<thead>
<tr>
<th></th>
<th>Schermi molto piccoli < 320px</th>
<th>Schermi piccoli (tablet)</th>
<th>Desktop 1170px</th>
</tr>
</thead>
<tbody>

<tr>
  <td>Breakpoint</td>
  <td>Auto</td>
  <td>750px</td>
  <td>1170px</td>
</tr>

<tr>
  <td>Larghezza 1 colonna</td>
  <td>Auto</td>
  <td>720px</td>
  <td>1040px</td>
</tr>

<tr>
  <td>Larghezza 2 colonne</td>
  <td></td>
  <td>352px</td>
  <td>512px</td>
</tr>

<tr>
  <td>Larghezza 3 colonne</td>
  <td></td>
  <td>229px</td>
  <td>336px</td>
</tr>

<tr>
  <td>Larghezza 4 colonne</td>
  <td></td>
  <td>168px</td>
  <td>248px</td>
</tr>

<tr>
  <td>Interspazio colonna</td>
  <td></td>
  <td>16px</td>
  <td></td>
</tr>

<tr>
  <td>Margini della pagina</td>
  <td>16px</td>
  <td>24pxpx</td>
  <td></td>
</tr>

</tbody>
</table>
</div>

Sul formato mobile è prevista la collocazione di una sola colonna con un margine di 16 px. Sui successivi break, tablet e desktop, si potrà optare per un’impaginazione basata su un numero maggiore di colonne (2, 3 o 4) la cui larghezza è in percentuale della viewport, con uno spazio fisso intercolonna di 16 px e un margine di pagina di 24 px. 

<!--
<figure>
  ![](/images/tavola_2.png)
  <figcaption>Figura 1 </figcaption>
</figure>
-->

### Esempio di griglia responsive

Segue un esempio di [griglia "responsive"](http://getbootstrap.com/css/#grid) ottenuto 
applicando il CSS di Bootstrap e utilizzando le classi ```container, row, col-*```

```markup
  <div class="lg-example-grid container">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <div>12/12</div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6"><div>6/12</div></div>
      <div class="col-xs-6"><div>6/12</div></div>
    </div>
    <div class="row">
      <div class="col-md-4 col-xs-12">
        <div class="hidden-xs hidden-sm">4/12</div>
        <div class="visible-sm visible-xs">12/12</div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="hidden-xs hidden-sm">4/12</div>
        <div class="visible-sm visible-xs">12/12</div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="hidden-xs hidden-sm">4/12</div>
        <div class="visible-sm visible-xs">12/12</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-xs-6">
        <div class="hidden-xs hidden-sm">3/12</div>
        <div class="visible-sm visible-xs">6/12</div>
      </div>
      <div class="col-md-3 col-xs-6">
        <div class="hidden-xs hidden-sm">3/12</div>
        <div class="visible-sm visible-xs">6/12</div>
      </div>
      <div class="col-md-3 col-xs-6">
        <div class="hidden-xs hidden-sm">3/12</div>
        <div class="visible-sm visible-xs">6/12</div>
      </div>
      <div class="col-md-3 col-xs-6">
        <div class="hidden-xs hidden-sm">3/12</div>
        <div class="visible-sm visible-xs">6/12</div>
      </div>
    </div>
  </div>

```
