var config = {
  
  /*********************
   *** search config ***
   *********************/
   
  engines: [
    // The first entry is used as the default engine and is hidden
    { name: 'google',      param: 'q',              url: 'https://encrypted.google.com/search' },
    { name: 'g.maps',      param: 'q',              url: 'https://maps.google.com/' },
//  { name: 'ddg',         param: 'q',              url: 'https://duckduckgo.com/' },
//  { name: 'bing',        param: 'q',              url: 'http://www.bing.com/search' },
//  { name: 'yahoo',       param: 'p',              url: 'https://search.yahoo.com/search' },
    { name: 'wikipedia',   param: 'search',         url: 'https://en.wikipedia.org/wiki/Special:Search' },
    { name: 'youtube',     param: 'search_query',   url: 'https://www.youtube.com/results' },
//  { name: 'amazon',      param: 'field-keywords', url: 'http://www.amazon.com/s/' },
//  { name: 'ebay',        param: '_nkw',           url: 'http://www.ebay.com/sch/' },
//  { name: 'imdb',        param: 'q',              url: 'http://www.imdb.com/find' },
    { name: 'deviantart',  param: 'q',              url: 'https://browse.deviantart.com/' },
    { name: 'github',      param: 'q',              url: 'https://github.com/search' },
//  { name: 'ubuntuusers', param: 'query',          url: 'http://ubuntuusers.de/search/' },
//  { name: 'hoogle',      param: 'hoogle',         url: 'http://www.haskell.org/hoogle/' }
  ],
  
  
  /****************
   *** top menu ***
   ****************/
  
  links: [
    // The first entry is also used by the logo
    { name: 'github',     url: 'https://github.com/gandalfx' },
    { name: 'deviantArt', url: 'https://gandalfx.deviantart.com/' }
  ],
  
  
  /*********************
   *** picture config ***
   *********************/
  
  collections: [
    {
      name:   'lego',
      active: true
    },
    {
      name:   'gandalfx',
      active: false
    }
  ],
  
  pictures_lego: [
    // thanks to http://balakov.deviantart.com
    { style: '',      src: 'http://fc02.deviantart.net/fs44/i/2009/149/7/d/Raintrooper_by_Balakov.jpg' },
    { style: '',      src: 'http://fc09.deviantart.net/fs43/i/2009/143/6/3/American_Beauty_by_Balakov.jpg' },
    { style: '',      src: 'http://fc00.deviantart.net/fs71/i/2010/121/9/8/Simplicity_by_Balakov.jpg' },
    { style: 'white', src: 'http://th09.deviantart.net/fs70/PRE/i/2010/302/3/8/presents_by_balakov-d31qp0c.jpg' },
    { style: 'white', src: 'http://fc09.deviantart.net/fs44/i/2009/114/f/c/Cold_by_Balakov.jpg' },
    { style: 'white', src: 'http://fc06.deviantart.net/fs71/i/2013/300/8/3/upgrade_by_balakov-d6s0qi1.jpg' }
  ],
  
  pictures_gandalfx: [
    { style: '',      src: 'http://fc03.deviantart.net/fs70/f/2011/197/a/2/got_a_light_by_gandalfx-d3wg825.png' },
    { style: '',      src: 'http://fc09.deviantart.net/fs71/f/2012/320/7/c/gtg_by_gandalfx-d2ydn2p.png' },
    { style: '',      src: 'http://fc08.deviantart.net/fs70/f/2010/331/b/2/glasses_and_laptop_by_gandalfx-d33ppkq.png' },
    { style: '',      src: 'http://fc05.deviantart.net/fs70/i/2011/040/1/4/triangle_by_gandalfx-d2lsm64.png' },
    { style: '',      src: 'http://fc05.deviantart.net/fs71/f/2010/067/5/3/MyCup_by_Gandalfx.png' },
    // sigs
    { style: '',      src: 'http://fc00.deviantart.net/fs70/f/2010/360/2/4/yellow_submarine_by_gandalfx-d35p16k.png' },
    { style: '',      src: 'http://fc05.deviantart.net/fs71/f/2010/225/1/f/music_plays_forever_by_Gandalfx.png' },
    { style: '',      src: 'http://fc05.deviantart.net/fs71/f/2010/312/2/2/pumpkin_by_gandalfx-d32g0ft.png' },
    { style: '',      src: 'http://fc00.deviantart.net/fs71/f/2010/203/b/c/Silence_in_the_roaring_rain_by_Gandalfx.png' },
    { style: '',      src: 'http://fc00.deviantart.net/fs71/f/2010/156/2/6/Can__t_see_me_II_by_Gandalfx.png' },
    { style: '',      src: 'http://fc06.deviantart.net/fs70/f/2010/136/2/0/Pops_by_Gandalfx.png' },
    { style: '',      src: 'http://fc03.deviantart.net/fs71/f/2010/110/e/2/SpiderBusiness_by_Gandalfx.png' },
    { style: '',      src: 'http://fc07.deviantart.net/fs70/f/2010/113/1/9/I__m_on_a_Boat_by_Gandalfx.png' },
    { style: '',      src: 'http://fc06.deviantart.net/fs71/f/2010/118/0/4/Dark_Knight_by_Gandalfx.png' },
    { style: '',      src: 'http://fc08.deviantart.net/fs70/f/2010/078/b/a/an_Ace_for_21_by_Gandalfx.png' },
    { style: '',      src: 'http://fc01.deviantart.net/fs71/f/2010/183/f/b/flowshot_by_Gandalfx.png' }
  ]
}
