function navigateLink(e) {
  if (e.type === 'click' || e.key === 'Enter') {
    const href = this.getAttribute('data-href');
    window.location.replace(href);
  }
}

function getStyle(node) {
  const style = node.getAttribute('style');
  const dict = {};
  for (const line of style.split(';')) {
    const [k, v] = line.split(':');
    dict[k] = v;
  }
  return dict;
}

function toStyle(dict) {
  let s = '';
  for (const [k, v] of Object.entries(dict)) {
    if (v !== undefined) {
      s = `${k}:${v};${s}`;
    }
  }
  return s;
}

function bgImageUrl(img) {
  return img ? `url("${img}")` : undefined;
}

function isActiveSection(url) {
  const loc = window.location.pathname;
  if (loc === '/' || url === '/') {
    return url === loc;
  }

  return loc.startsWith(url);
}

function addDiamond(n, row, col, N, delay, container, opts = {}) {
  const diamond = document.createElement('div');
  const i = N - n;
  const depth = row + col;

  const base = {
    'grid-row-start': row + 1,
    'grid-column-start': col + 1,
    'z-index': depth,
  };
  diamond.setAttribute('class', 'diamond--small');
  diamond.setAttribute('style', toStyle(base));
  container.appendChild(diamond);

  if (opts.img) {
    diamond.setAttribute('class', 'diamond--small diamond--img');

    diamond.setAttribute(
      'style',
      toStyle({
        ...base,
        'background-image': bgImageUrl(opts.img),
      })
    );
  }
  if (opts.href) {
    // special diamonds with content
    diamond.addEventListener('click', navigateLink);
    diamond.addEventListener('keydown', navigateLink);
    diamond.setAttribute('tabindex', '0');
    diamond.setAttribute('aria-role', 'link');
    diamond.setAttribute('data-href', opts.href);
    const active = isActiveSection(opts.href);
    diamond.setAttribute(
      'class',
      `diamond--small diamond--link ${active ? 'active' : ''}`
    );
  }
  setTimeout(
    () => {
      const text = document.createElement('span');
      text.textContent = opts.label;
      diamond.appendChild(text);
    },
    (n + 2) * delay
  );

  setTimeout(() => {
    diamond.setAttribute(
      'style',
      toStyle({
        ...base,
        '--background-image': bgImageUrl(opts.img),
        width: '100%',
        height: '100%',
      })
    );
  }, n * delay);
}
function animateDiamonds(
  container,
  diamonds,
  style = 'crisscross',
  row = 0,
  col = 0,
  dir = 'u',
  delay = 200
) {
  let N = diamonds.length;
  let n = 0;
  while (n < N) {
    if (style === 'crisscross') {
      if (row === 0 && dir === 'u') {
        dir = 'r';
      } else if (row === 0 && dir === 'r') {
        dir = 'd';
      } else if (row === col && dir === 'd') {
        dir = 'l';
      } else if (row === col && dir === 'r') {
        dir = 'u';
      } else if (col === 0 && dir === 'l') {
        dir = 'd';
      } else if (col === 0 && dir === 'd') {
        dir = 'r';
      }

      switch (dir) {
        case 'u':
          row -= 1;
          break;
        case 'd':
          row += 1;
          break;
        case 'l':
          col -= 1;
          break;
        case 'r':
          col += 1;
          break;
      }
    }
    if (style === 'flat') {
      col += 1;
    }
    addDiamond(n, row, col, N, delay, container, diamonds[n]);

    n += 1;
  }
}

if (window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function (event) {
    setTimeout(() =>
      animateDiamonds(
        document.querySelector('.diamond-container'),
        [
          {},
          {},
          { img: '/me.jpg' },
          { href: '/publication/', label: 'research' },
          {},
          { href: '/project/', label: 'random' },
          {},
          { href: '/post/', label: 'blog' },
          {},
        ],
        'crisscross',
        0,
        -1,
        'u'
      )
    );
  });
} else {
  document.addEventListener('DOMContentLoaded', function (event) {
    setTimeout(() =>
      animateDiamonds(
        document.querySelector('.diamond-container--nav'),
        [
          { href: '/', label: 'home' },
          { href: '/publication/', label: 'research' },
          { href: '/post/', label: 'blog' },
          { href: '/project/', label: 'random' },
        ],
        'flat',
        0,
        -1
      )
    );
  });
}
