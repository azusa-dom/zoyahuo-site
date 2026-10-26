import { createCodeTicker, toLines } from './code-ticker.js'
import { RINGS_DEF, detail } from './data.js'
import { PROFILE as P, T, LANGS, HTML_LANG, ganzhiOf } from './profile.js'

const $ = (s, r = document) => r.querySelector(s)
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const gz = ganzhiOf()

const ICONS = {
  github: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  orcid: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7.2" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="8" y="10.9" text-anchor="middle" font-size="7.5" font-weight="700" font-family="Arial,sans-serif" fill="currentColor">iD</text></svg>',
  scholar: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1 0 5.8l8 4.8 6-3.6V12h1.4V5.8z"/><path fill="currentColor" d="M3.4 9.6v2.4c0 1.3 2.1 2.6 4.6 2.6s4.6-1.3 4.6-2.6V9.6L8 12.4z"/></svg>',
  email: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.2" y="3" width="13.6" height="10" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="m1.6 3.8 6.4 5 6.4-5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
}

// 一、语言：?lang= 优先，其次上次的选择，再其次浏览器语言 ---------------------------------------
function pickLang() {
  const q = new URLSearchParams(location.search).get('lang')
  if (q && T[q]) return q
  try { const s = localStorage.getItem('lang'); if (s && T[s]) return s } catch {}
  const n = (navigator.language || '').toLowerCase()
  return n.startsWith('ja') ? 'ja' : n.startsWith('zh') ? 'zh' : 'en'
}
let lang = pickLang()

// 二、字环：用原版，首页立体展开，其他分页退成静置底景 ----------------------------------------
const tip = $('#tip')
let hideTip = 0
let wheel = null
// 字环（three.js，体积最大）放在文字出来之后再加载，不挡住首屏
async function initWheel() {
  try {
    const { createCelestialWheel } = await import('./celestial-wheel.js')
    wheel = createCelestialWheel($('#wheel'), {
      onFocus(info) {
        clearTimeout(hideTip)
        const cell = info && info.cell
        if (!cell) { tip.classList.remove('on'); return }
        tip.textContent = `${cell.ring ?? ''} · ${cell.label ?? ''}　${cell.text ?? ''}`
        tip.classList.add('on')
        hideTip = setTimeout(() => tip.classList.remove('on'), 4000)
      },
    })
    wheel.setMode(route === 'home' ? 'landing' : 'calm')
    $('#wheel').classList.add('ready')
  } catch (err) {
    console.error('wheel unavailable (WebGL?)', err)
    $('#explore').hidden = true
  }
}

// 十干十二支面板：选一个字，字环聚焦到它
for (const [key, id] of [['十天干', 'gan-options'], ['十二地支', 'zhi-options']]) {
  const ring = RINGS_DEF.find((r) => r.key === key)
  ring.items.forEach((item, i) => {
    const b = document.createElement('button')
    b.textContent = item.label
    b.setAttribute('aria-pressed', 'false')
    b.addEventListener('click', () => {
      document.querySelectorAll('.glyph-options button').forEach((x) => { x.classList.remove('selected'); x.setAttribute('aria-pressed', 'false') })
      b.classList.add('selected'); b.setAttribute('aria-pressed', 'true')
      $('#glyph-detail').textContent = `${key} · ${item.label}：${detail(ring, item, i)}`
      wheel?.focusCell(key, i)
    })
    document.getElementById(id).append(b)
  })
}
$('#explore').addEventListener('click', () => $('#explore-dialog').showModal())
$('#explore-dialog').addEventListener('close', () => wheel?.leave())
document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()))
$('#explore-dialog').addEventListener('click', (e) => {
  const d = e.currentTarget
  if (e.target !== d) return
  const r = d.getBoundingClientRect()
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close()
})

// 三、打字机：只在首页可见，一直在后台往下打，切页不会重来 -------------------------------------
const card = toLines(`// ${P.name.toLowerCase().replace(' ', '-')}.js
const me = {
  name: '${P.name}',
  now: ['University of Manchester · PhD (AI4BioImaging)'],
  before: ['GoUni · full-stack', 'UCL · Master\\'s', 'Baidu · Beijing'],
  faculty: 'Biology, Medicine and Health',
}

// 今天
const today = { year: '${gz.year}', day: '${gz.day}' }

// 研究主线
const pipeline = [
${P.pipeline.map((p) => `  '${p}',`).join('\n')}
]

// 运动场 u → 形变梯度 F → 应变张量 E
const F = (u) => I + grad(u)              // F = I + ∇u
const E = (F) => 0.5 * (F.T @ F - I)      // Green-Lagrange
const strain = (u) => project(E(F(u)), radial, circumferential, longitudinal)
`)
createCodeTicker($('#code'), { lines: card, cps: 40 })

// 四、页面内容：按当前语言整体重画 ---------------------------------------------------------------
const ORDER = ['home', 'about', 'research', 'contact']
const HREF = { home: '#/', about: '#/about', research: '#/research', contact: '#/contact' }
let route = 'home'

function renderLang() {
  const t = T[lang], u = t.ui
  document.documentElement.lang = HTML_LANG[lang]
  $('meta[name="description"]').setAttribute('content', t.desc)
  $('#skip').textContent = u.skip
  $('#seal').textContent = P.seal
  $('#brand-name').textContent = P.name
  $('#mega-zh').textContent = P.mega
  $('#now').innerHTML = `${esc(gz.year)}年 · <b>${esc(gz.day)}日</b>`

  $('#nav').innerHTML = ORDER.map((r) => `<a href="${HREF[r]}" data-route="${r}">${esc(u.nav[r])}${r === 'contact' ? ' <span>↗</span>' : ''}</a>`).join('')
  $('#lang').innerHTML = LANGS.map(([k, label]) => `<button data-lang="${k}" aria-pressed="${k === lang}" aria-label="${esc(u.langLabel)}: ${esc(label)}">${esc(label)}</button>`).join('')
  document.querySelectorAll('#lang button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)))

  // 首页
  $('#loc').textContent = P.location
  $('#greeting').textContent = u.greeting
  $('#slogan').innerHTML = `${esc(u.slogan[0])}<br>${esc(u.slogan[1])}<span class="period">。</span>`
  $('#lead').innerHTML = u.lead.map(esc).join('<br>')
  $('#cta').innerHTML = `${esc(u.primary)} <span>↗</span>`
  $('#cta2').innerHTML = `${esc(u.quiet)} <span>→</span>`
  $('#role').textContent = u.role
  $('#org').textContent = u.org
  $('#caption').textContent = u.caption
  $('#explore').textContent = `${u.explore} ↗`
  $('#next-home').innerHTML = `${esc(u.nextHome)} <span>→</span>`

  // 关于
  const pg = t.pages
  $('#about-glyph').textContent = pg.about.glyph
  $('#about-eyebrow').textContent = pg.about.eyebrow
  $('#about-title').textContent = pg.about.title
  $('#about-text').innerHTML = t.about.map((x) => `<p>${esc(x)}</p>`).join('')
  const L0 = P.links
  $('#about-links').innerHTML = [
    ['github', 'GitHub', L0.github], ['orcid', 'ORCID', L0.orcid], ['scholar', 'Google Scholar', L0.scholar],
    ['email', 'Email', L0.email ? HREF.contact : ''],
  ].filter(([, , href]) => href).map(([k, n, href]) => {
    const ext = href.startsWith('http')
    return `<a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${ICONS[k]}<span>${n}</span></a>`
  }).join('')
  $('#sub-timeline').textContent = pg.about.timeline
  $('#timeline').innerHTML = t.timeline.map((x) => `
    <li><span class="when">${esc(x.when)}</span>
      <div><span class="what">${esc(x.what)}<small>${esc(x.where)}</small></span>
      <span class="detail">${esc(x.detail)}</span></div></li>`).join('')
  $('#interests').innerHTML = t.chips.map((x) => `<span>${esc(x)}</span>`).join('')
  $('#sub-why').textContent = pg.about.why
  $('#why').innerHTML = t.whyItems.map((x) => `<div class="why-item"><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></div>`).join('') +
    `<p class="why-note">${esc(t.whyNote)}</p>`

  // 研究
  $('#research-glyph').textContent = pg.research.glyph
  $('#research-eyebrow').textContent = pg.research.eyebrow
  $('#research-title').textContent = pg.research.title
  $('#research-figure').innerHTML = t.figure
    ? `<figure><a href="${esc(t.figure.src)}" target="_blank" rel="noopener"><img src="${esc(t.figure.src)}" alt="${esc(t.figure.alt)}" width="${t.figure.w}" height="${t.figure.h}" loading="lazy" decoding="async"></a><figcaption>${esc(t.figure.caption)}</figcaption></figure>`
    : ''
  const rp = pg.research
  $('#sub-projects').textContent = rp.projects
  $('#sub-details').textContent = rp.details
  $('#project-cards').innerHTML = t.projects.map((c) => `
    <article class="card">
      <span class="status">${esc(c.status)}</span>
      <h3>${esc(c.title)}</h3><p class="card-en">${esc(c.en)}</p>
      <p><b>${esc(rp.q)}</b>${esc(c.q)}</p>
      <p><b>${esc(rp.how)}</b>${esc(c.how)}</p>
      ${c.link ? `<p class="detail-links"><a href="${esc(c.link.href)}" target="_blank" rel="noopener noreferrer">${esc(c.link.label)} ↗</a></p>` : ''}
    </article>`).join('')
  const openState = [...document.querySelectorAll('#research-list details')].map((d) => d.open)
  $('#research-list').innerHTML = t.research.map((r, i) => `
    <details${(openState.length ? openState[i] : r.open) ? ' open' : ''}>
      <summary><div><span class="research-tag">${esc(r.tag)}</span><h3>${esc(r.title)}</h3><p>${esc(r.en)}</p></div><span class="detail-symbol">＋</span></summary>
      <div class="detail-body">
        ${(r.body || []).map((x) => `<p>${esc(x)}</p>`).join('')}
        ${r.flow ? `<div class="flow">${r.flow.map((f) => `<span>${esc(f)}</span>`).join('<i>→</i>')}</div>` : ''}
        ${r.after ? `<p>${esc(r.after)}</p>` : ''}
        ${r.links ? `<p class="detail-links">${r.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')}</p>` : ''}
      </div>
    </details>`).join('')

  // 联系
  $('#contact-glyph').textContent = pg.contact.glyph
  $('#contact-eyebrow').textContent = pg.contact.eyebrow
  $('#contact-title').textContent = pg.contact.title
  $('#contact-lead').textContent = pg.contact.lead
  const L = P.links
  const c = pg.contact
  const extra = [['github', 'GitHub'], ['scholar', 'Google Scholar'], ['orcid', 'ORCID']].filter(([k]) => L[k])
  const to = encodeURIComponent(L.email || ''), su = encodeURIComponent(c.subject)
  $('#contact-body').innerHTML =
    (L.email
      ? `<div class="contact-mail" id="mail-text">${esc(L.email)}</div>
         <div class="contact-actions">
           <button type="button" id="copy-mail">${esc(c.copy)}</button>
           <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}" target="_blank" rel="noopener noreferrer">${esc(c.gmail)} ↗</a>
           <a href="https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${su}" target="_blank" rel="noopener noreferrer">${esc(c.outlook)} ↗</a>
           <a href="mailto:${esc(L.email)}?subject=${su}">${esc(c.mail)}</a>
         </div>
         <p class="contact-hint">${esc(c.hint)}</p>`
      : `<p class="muted">${esc(c.none)}</p>`) +
    (extra.length ? `<div class="contact-links">${extra.map(([k, n]) => `<a href="${esc(L[k])}" target="_blank" rel="noopener noreferrer">${n} ↗</a>`).join('')}</div>` : '')
  $('#copy-mail')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget
    let ok = false
    try { await navigator.clipboard.writeText(L.email); ok = true } catch {
      const ta = document.createElement('textarea')
      ta.value = L.email; ta.style.cssText = 'position:fixed;opacity:0'
      document.body.append(ta); ta.select()
      try { ok = document.execCommand('copy') } catch {}
      ta.remove()
    }
    if (!ok) { const r = document.createRange(); r.selectNodeContents($('#mail-text')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r) }
    btn.textContent = ok ? `✓ ${c.copied}` : c.copyFail
    btn.classList.toggle('done', ok)
    setTimeout(() => { btn.textContent = c.copy; btn.classList.remove('done') }, 2200)
  })

  // 十干十二支面板
  $('#dlg-title').textContent = u.dialog.title
  $('#dlg-hint').textContent = u.dialog.hint
  $('#dlg-gan').textContent = u.dialog.gan
  $('#dlg-zhi').textContent = u.dialog.zhi
  if (!document.querySelector('.glyph-options .selected')) $('#glyph-detail').textContent = u.dialog.idle

  // 上一页 / 下一页
  document.querySelectorAll('[data-pager]').forEach((nav) => {
    const r = nav.closest('.page').dataset.route
    const i = ORDER.indexOf(r)
    const prev = ORDER[i - 1], next = ORDER[i + 1]
    nav.innerHTML =
      (prev ? `<a href="${HREF[prev]}"><small>${esc(u.prev)}</small>← ${esc(u.nav[prev])}</a>` : '<span></span>') +
      (next ? `<a class="r" href="${HREF[next]}"><small>${esc(u.next)}</small>${esc(u.nav[next])} →</a>` : '')
  })
  applyRoute()
}

function setLang(l) {
  if (!T[l] || l === lang) return
  lang = l
  try { localStorage.setItem('lang', l) } catch {}
  const url = new URL(location.href)
  if (url.searchParams.has('lang')) { url.searchParams.set('lang', l); history.replaceState(null, '', url) }
  renderLang()
}

// 五、分页路由：#/  #/about  #/research  #/contact --------------------------------------------
function applyRoute() {
  document.body.dataset.page = route
  document.querySelectorAll('.page').forEach((p) => {
    const on = p.dataset.route === route
    p.classList.toggle('active', on)
    p.inert = !on
  })
  document.querySelectorAll('#nav a').forEach((a) => {
    const on = a.dataset.route === route
    a.classList.toggle('active', on)
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')
  })
  const t = T[lang]
  document.title = route === 'home' ? t.title : `${t.ui.nav[route]} · ${P.name}`
}

function show() {
  const raw = location.hash.replace(/^#\/?/, '').split('?')[0]
  route = ORDER.includes(raw) ? raw : 'home'
  applyRoute()
  const active = document.querySelector('.page.active')
  if (active) active.scrollTop = 0
  tip.classList.remove('on')
  wheel?.setMode(route === 'home' ? 'landing' : 'calm')
}
addEventListener('hashchange', show)

renderLang()
show()
requestAnimationFrame(() => setTimeout(initWheel, 0))

document.addEventListener('visibilitychange', () => { if (document.hidden) tip.classList.remove('on') })
addEventListener('pagehide', () => wheel?.dispose(), { once: true })
