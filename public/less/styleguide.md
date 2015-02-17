
[Styleguide](http://cdpn.io/779351fc419e20c2d21794c755467a8a)
=====

Less file Layout
---------

<pre>
```
less/
  style.less
  - partials/
    _base.less
    _colors
    _content
    _footer
    _header
    _images
    _jcarousel_scroller
    _language_select
    _pallette
    _searchbar
    _theme
    _top-nav
    _top-cart
    - existing/
        _jquery-colorbox-1-3-16
        _jquery-bt-0-9-5
        _screen
        _jquery-ui-stars-3-0-1-custom
        _jquery-ui-autocomplete-1-8-18
        _jquery-treeview
        _tab
        _jquery-scrollplus
            - theme/
                _hint
                _theme-green
                _theme-green-b2b
    - font-awesome/
```
</pre>

***

## Less import structure:

### style
#### imports partials/
 + _base
 + _carousel
 + _theme
 + _header
 + _top-nav
 + _content
 + _top-cart
 + _jcarousel_scroller
 + _footer
 + 
#### imports partials/existing/

 + _siteSearch
 + _jquery-colorbox-1-3-16
 + _jquery-bt-0-9-5
 + _screen
 + _jquery-ui-stars-3-0-1-custom
 + _jquery-ui-autocomplete-1-8-18
 + _jquery-treeview
 + _tab
 + _jquery-scrollplus

***

### _base
#### imports partials/
+ font-awesome/font-awesome
+ _lesshat
+ _images
+ _colors

***

### _header
#### imports partials/
+ _searchbar
+ _language_select

***

### _theme
#### imports partials/existing/theme/
+ _theme-green
+ _theme-green-b2b
+ _hint