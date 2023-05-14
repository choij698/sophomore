import { datas } from '../data/data.js';

/**
 * 좌측 중앙 버튼 관련
 */
const buttons = [
  { selector: '.minimum', className: 'minimum' },
  { selector: '.medium', className: 'medium' },
  { selector: '.maximum', className: 'maximum' },
];

const setClassNameAndRefresh = (className) => {
  document.body.className = className;
  refresh(className);
};

buttons.forEach((button) => {
  document.querySelector(button.selector).addEventListener('click', () => {
    setClassNameAndRefresh(button.className);
  });
});

/**
 * 상태에 따른 화면 그리기
 */
const refresh = (level = '') => {
  /**
   * 중앙 메인 컨텐츠 관련
   */
  const $prevContent = document.querySelector('.content');
  if ($prevContent) {
    $prevContent.remove();
  }

  const $content = document.createElement('div');
  $content.className = 'content';
  datas.forEach((data, index) => {
    const $item = document.createElement('div');
    $item.className = 'item';
    $item.style.transform = `
      rotate(${7.2 * index}deg)
    `;
    let isOn = false;
    data.bubbles.forEach((bubble) => {
      const isOff = level !== '' && level !== bubble.custody_level;
      if (!isOff) {
        isOn = true;
      }
      const $bubble = document.createElement('img');
      $bubble.className = `bubble ${isOff} ${bubble.custody_level.toLowerCase()}`;
      $bubble.src = `./svgs/${bubble.size}${isOff ? '_off' : ''}.svg`;
      $bubble.style.right = `${bubble.css_position}px`;
      if (!isOff) {
        $bubble.onmouseover = () => {
          const $guide = document.querySelector('.guide');
          if ($guide) {
            $guide.remove();
          }
          const $prevDesc = document.querySelector('.desc');
          if ($prevDesc) {
            $prevDesc.remove();
          }
          const $desc = document.createElement('div');
          $desc.className = 'desc';
          $desc.innerHTML = `
            <div class="desc">
              <div class="percentage">${bubble.infraction_rate_per}%</div>
              <div class="text">${data.name}</div>
            </div>
          `;
          $content.appendChild($desc);
        };
      }
      $item.appendChild($bubble);
    });
    const $startDot = document.createElement('img');
    $startDot.className = `start_dot ${isOn}`;
    $startDot.src = `./svgs/small${isOn ? '' : '_off'}.svg`;
    $item.appendChild($startDot);
    const $charge = document.createElement('div');
    $charge.className = `charge ${isOn}`;
    $charge.innerHTML = data.charge;
    $item.appendChild($charge);
    const $dotLine = document.createElement('div');
    $dotLine.className = `dot_line ${isOn}`;
    $item.appendChild($dotLine);
    $content.appendChild($item);
  });

  /**
   * 우측 하단 정보 관련
   */
  const $prevAvg = document.querySelector('.avg');
  if ($prevAvg) {
    $prevAvg.remove();
  }
  const $avg = document.createElement('div');
  $avg.className = 'avg';
  switch (level) {
    case 'minimum':
      $avg.innerHTML = `
        <div class="title">Minimum Custody Level</div>
        <div>Total Inmates: 1,616</div>
        <div>Inmates who violated rules: 129</div>
        <div>Rule violation rate: 7.98%</div>
      `;
      break;
    case 'medium':
      $avg.innerHTML = `
        <div class="title">Medium Custody Level</div>
        <div>Total Inmates: 2,450</div>
        <div>Inmates who violated rules: 586</div>
        <div>Rule violation rate: 23.92%</div>
      `;
      break;
    case 'maximum':
      $avg.innerHTML = `
        <div class="title">Maximum Custody Level</div>
        <div>Total Inmates: 1,858</div>
        <div>Inmates who violated rules: 1,256</div>
        <div>Rule violation rate: 67.60%</div>
      `;
      break;
    default:
      $avg.innerHTML = `
        <div class="title">Total</div>
        <div>Total Inmates: 5,924</div>
        <div>Inmates who violated rules: 1,971</div>
        <div>Rule violation rate: 33.27%</div>
      `;
      break;
  }
  document.querySelector('.status').appendChild($avg);
  const $guide = document.createElement('div');
  $guide.className = 'guide';
  $guide.innerHTML = `
      Hover over to any circles<br>to see rule violation rate<br> per crime
    `;
  $content.appendChild($guide);
  document.body.appendChild($content);
};

/**
 * 최초 실행 시 화면 그리기
 */
refresh();
