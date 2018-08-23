const Verification = {
  _randstr: function (length) {
    var key = {

      //            str : [
      //                'a','b','c','d','e','f','g','h','i','j','k','l','m',
      //                'o','p','q','r','s','t','x','u','v','y','z','w','n',
      //                '0','1','2','3','4','5','6','7','8','9'
      //            ],
      str: [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ],

      randint: function (n, m) {
        var c = m - n + 1
        var num = Math.random() * c + n
        return Math.floor(num)
      },

      randStr: function () {
        var _this = this
        var leng = _this.str.length - 1
        var randkey = _this.randint(0, leng)
        return _this.str[randkey]
      },

      create: function (len) {
        var _this = this
        var l = len || 10
        var str = ''

        for (var i = 0; i < l; i++) {
          str += _this.randStr()
        }

        return str
      }

    }

    length = length || 10

    return key.create(length)
  },
  _randint: function (n, m) {
    var c = m - n + 1
    var num = Math.random() * c + n
    return Math.floor(num)
  },
  vCode: function (dom, options) {
    this.codeDoms = []
    this.lineDoms = []
    this.initOptions(options)
    this.dom = dom
    this.init()
    this.addEvent()
    this.update()
    this.mask()
  },
  init: function () {
    this.dom.style.position = 'relative'
    this.dom.style.overflow = 'hidden'
    this.dom.style.cursor = 'pointer'
    this.dom.title = '点击更换验证码'
    this.dom.style.background = this.options.bgColor
    this.w = this.dom.clientWidth
    this.h = this.dom.clientHeight
    this.uW = this.w / this.options.len
  },
  mask: function () {
    var dom = document.createElement('div')
    dom.style.cssText = [
      'width: 100%',
      'height: 100%',
      'left: 0',
      'top: 0',
      'position: absolute',
      'cursor: pointer',
      'z-index: 9999999'
    ].join(';')

    dom.title = '点击更换验证码'

    this.dom.appendChild(dom)
  },
  addEvent: function () {
    var _this = this
    _this.dom.addEventListener('click', function () {
      _this.update()
    })
  },
  initOptions: function (options) {
    var F = function () {
      this.len = 4
      this.fontSizeMin = 20
      this.fontSizeMax = 48
      this.colors = [
        'green',
        'red',
        'blue',
        '#53da33',
        '#AA0000',
        '#FFBB00'
      ]
      this.bgColor = '#FFF'
      this.fonts = [
        'Times New Roman',
        'Georgia',
        'Serif',
        'sans-serif',
        'arial',
        'tahoma',
        'Hiragino Sans GB'
      ]
      this.lines = 8
      this.lineColors = [
        '#888888',
        '#FF7744',
        '#888800',
        '#008888'
      ]

      this.lineHeightMin = 1
      this.lineHeightMax = 3
      this.lineWidthMin = 1
      this.lineWidthMax = 60
    }

    this.options = new F()

    if (typeof options === 'object') {
      for (var i in options) {
        this.options[i] = options[i]
      }
    }
  },
  update: function () {
    for (var i = 0; i < this.codeDoms.length; i++) {
      this.dom.removeChild(this.codeDoms[i])
    }
    for (var j = 0; j < this.lineDoms.length; j++) {
      this.dom.removeChild(this.lineDoms[j])
    }
    this.createCode()
    this.draw()
  },
  createCode: function () {
    this.code = this._randstr(this.options.len)
  },
  verify: function (code) {
    return this.code === code
  },
  draw: function () {
    this.codeDoms = []
    for (var i = 0; i < this.code.length; i++) {
      this.codeDoms.push(this.drawCode(this.code[i], i))
    }

    this.drawLines()
  },
  drawCode: function (code, index) {
    var dom = document.createElement('span')

    dom.style.cssText = [
      'font-size:' + this._randint(this.options.fontSizeMin, this.options.fontSizeMax) + 'px',
      'color:' + this.options.colors[this._randint(0, this.options.colors.length - 1)],
      'position: absolute',
      'left:' + this._randint(this.uW * index, this.uW * index + this.uW - 10) + 'px',
      'top:' + this._randint(0, this.h - 30) + 'px',
      'transform:rotate(' + this._randint(-30, 30) + 'deg)',
      '-ms-transform:rotate(' + this._randint(-30, 30) + 'deg)',
      '-moz-transform:rotate(' + this._randint(-30, 30) + 'deg)',
      '-webkit-transform:rotate(' + this._randint(-30, 30) + 'deg)',
      '-o-transform:rotate(' + this._randint(-30, 30) + 'deg)',
      'font-family:' + this.options.fonts[this._randint(0, this.options.fonts.length - 1)],
      'font-weight:' + this._randint(400, 900)
    ].join(';')

    dom.innerHTML = code
    this.dom.appendChild(dom)

    return dom
  },
  drawLines: function () {
    this.lineDoms = []
    for (var i = 0; i < this.options.lines; i++) {
      var dom = document.createElement('div')
      dom.style.cssText = [
        'position: absolute',
        'opacity: ' + this._randint(3, 8) / 10,
        'width:' + this._randint(this.options.lineWidthMin, this.options.lineWidthMax) + 'px',
        'height:' + this._randint(this.options.lineHeightMin, this.options.lineHeightMax) + 'px',
        'background: ' + this.options.lineColors[this._randint(0, this.options.lineColors.length - 1)],
        'left:' + this._randint(0, this.w - 20) + 'px',
        'top:' + this._randint(0, this.h) + 'px',
        'transform:rotate(' + this._randint(-30, 30) + 'deg)',
        '-ms-transform:rotate(' + this._randint(-30, 30) + 'deg)',
        '-moz-transform:rotate(' + this._randint(-30, 30) + 'deg)',
        '-webkit-transform:rotate(' + this._randint(-30, 30) + 'deg)',
        '-o-transform:rotate(' + this._randint(-30, 30) + 'deg)',
        'font-family:' + this.options.fonts[this._randint(0, this.options.fonts.length - 1)],
        'font-weight:' + this._randint(400, 900)
      ].join(';')
      this.dom.appendChild(dom)

      this.lineDoms.push(dom)
    }
  }
}

export default Verification
