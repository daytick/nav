const lastLi = $('.siteList').find('li.last')
const sites = JSON.parse(localStorage.getItem('sites'))
const siteStorage = sites || [
  { logo: 'F', url: 'https://www.figma.com' },
  { logo: 'X', url: 'https://xiedaimala.com' }
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace(/\/.*/, '')  // 删除 / 开头的所有字符
}
const render = () => {
  $('.siteList').find('li:not(.last)').remove()
  siteStorage.forEach((item, index) => {
    const site = $(`<li>
                      <div class="site">
                        <div class="logo">${item.logo}</div>
                        <div class="link">${simplifyUrl(item.url)}</div>
                        <div class="remove">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-add"></use>
                          </svg>
                        </div>
                      </div>
                    </li>`).insertBefore(lastLi)
    // 模拟 a 标签
    site.on('click', () => {
      window.location.href = item.url
    })
    site.on('click', '.remove', (e) => {
      e.stopPropagation()  // 阻止冒泡
      siteStorage.splice(index, 1)
      render()
    })
  })
}

// 渲染
render()

$('.addButton').on('click', () => {
  // 获取用户输入的网址
  let url = prompt('请输入你要添加的网址')
  if (!url.startsWith('http')) {
    url = 'https://' + url
  }
  // 存储网站
  siteStorage.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  })
  // 重新渲染
  render()
})

// 窗口卸载时将网站保存到 localStorage
window.onbeforeunload = () => {
  localStorage.setItem('sites', JSON.stringify(siteStorage))
}

// 允许使用键盘打开网站
$(document).on('keypress', (e) => {
  const {key} = e
  siteStorage.forEach(item => {
    if(item.logo.toLowerCase() === key){
      window.location.href = item.url
    }
  })
})
$('.searchForm>input').on('keypress', (e) => {
  e.stopPropagation();
})