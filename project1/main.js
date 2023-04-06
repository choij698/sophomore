/**
 * default data
 */
const data = {
  section_1: {
    $section_1: document.querySelector(".section_1"),
    text: {
      $text: document.querySelector(".section_1 .text"),
      startRatio: 0.0, 
      halfRatio: 0.5, 
      endRatio: 0.8, 
    },
    heightNum: 3, 
  },
  section_2: {
    $section_2: document.querySelector(".section_2"),
    text: {
      $text: document.querySelector(".section_2 .text"),
      startRatio: 0.05, 
      step_1_ratio: 0.2, 
      step_2_ratio: 0.3, 
      step_3_ratio: 0.5, 
      endRatio: 0.88, 
    },
    $circle: document.querySelector(".section_2 .circle"),
    heightNum: 6, 
  },
  section_3: {
    $section_3: document.querySelector(".section_3"),
    $article_1: document.querySelector(".article_1"),
    $article_2: document.querySelector(".article_2"),
    $article_4: document.querySelector(".article_4"),
  },
};
let 반지름 = 8; 
let 원의크기 = 4;
let 회전속도 = 12000;

/**
 * sum of section_2_hide's width
 */
let hide_widths = [];
const $section_2_hides = document.querySelectorAll(".section_2 .hide");
for (let $section_2_hide of $section_2_hides) {
  hide_widths.push($section_2_hide.offsetWidth);
}

/**
 * sum of section_2_show's width
 */
let show_width_sum = 0;
document.querySelectorAll(".section_2 .show").forEach((e) => {
  show_width_sum += e.offsetWidth;
});

/**
 * set all section height
 */
for (let section_n in data) {
  data[section_n][`$${section_n}`].style.height = `${
    data[section_n].heightNum * 100
  }vh`;
}

/**
 * scroll to bottom
 */
const scrollBottom = () => {
  data.section_3.$section_3.scrollIntoView();
};

/**
 * set section_3 mode
 */
let mode = "default";
let interval;
let x = 0.5;
let y = 0.5;
const moveEvent = (e) => {
  const { clientX, clientY } = e.touches ? e.touches[0] : e;
  const { innerWidth, innerHeight } = window;

  x = (clientX / innerWidth).toFixed(2);
  y = (clientY / innerHeight).toFixed(2);
};
const blackCircleMode = () => {
  const {
    section_3: { $article_2, $article_3, $article_4 },
  } = data;
  let time = 0;
  const text = document.querySelector(".article_2 .text");
  let caculatedX = x * 100;
  let caculatedY = y * 100;

  const circleExpandMode = () => {
    if (time === 0) return;
    data.section_3.$section_3.style.overflow = "visible";
    data.section_3.$article_4.style.display = "none";
    text.style.height = "unset";
    $article_2.style.overflow = "visible";
    let size = 원의크기;
    mode = "circleExpand";
    clearInterval(interval);
    window.removeEventListener("touchmove", moveEvent);
    window.removeEventListener("mousemove", moveEvent);
    window.removeEventListener("click", circleExpandMode);
    interval = setInterval(() => {
      text.style.clipPath = `circle(${size}% at ${caculatedX}% ${caculatedY}%)`;
      size += 3;
      if (size > 300) clearInterval(interval);
    }, 16);
  };

  interval = setInterval(() => {
    const { innerWidth, innerHeight } = window;
    caculatedX = x * 100;
    caculatedY = y * 100;

    if (innerWidth > innerHeight) {
      caculatedX =
        x * 100 +
        (반지름 * Math.cos(90 - (90 / 회전속도) * time) * innerHeight) /
          innerWidth;
      caculatedY = y * 100 + 반지름 * Math.sin(90 - (90 / 회전속도) * time);
    } else {
      caculatedX = x * 100 + 반지름 * Math.cos(90 - (90 / 회전속도) * time);
      caculatedY =
        y * 100 +
        (반지름 * Math.sin(90 - (90 / 회전속도) * time) * innerWidth) /
          innerHeight;
    }

    text.style.clipPath = `circle(${원의크기}% at ${caculatedX}% ${caculatedY}%)`;
    time++;
  }, 16);

  mode = "blackCircle";
  data.section_1.$section_1.classList.add("active");
  data.section_2.$section_2.classList.add("active");
  $article_2.classList.add("active");
  $article_4.classList.remove("active");
  scrollBottom();
  window.addEventListener("touchmove", moveEvent);
  window.addEventListener("mousemove", moveEvent);
  window.addEventListener("click", circleExpandMode);
};

const blackCircleMode2 = () => {
  const {
    section_3: { $article_4, $article_3, $article_2 },
  } = data;
  let time = 0;
  const text = document.querySelector(".article_4 .text");
  let caculatedX = x * 100;
  let caculatedY = y * 100;

  const circleExpandMode = () => {
    if (time === 0) return;
    data.section_3.$section_3.style.overflow = "visible";
    data.section_3.$article_2.style.display = "none";
    $article_4.style.overflow = "visible";
    text.style.height = "unset";
    let size = 원의크기;
    mode = "circleExpand";
    clearInterval(interval);
    window.removeEventListener("touchmove", moveEvent);
    window.removeEventListener("mousemove", moveEvent);
    window.removeEventListener("click", circleExpandMode);
    interval = setInterval(() => {
      text.style.clipPath = `circle(${size}% at ${caculatedX}% ${caculatedY}%)`;
      size += 3;
      if (size > 300) clearInterval(interval);
    }, 16);
  };

  interval = setInterval(() => {
    const { innerWidth, innerHeight } = window;

    caculatedX = x * 100;
    caculatedY = y * 100;

    if (innerWidth > innerHeight) {
      caculatedX =
        x * 100 +
        (반지름 * Math.cos(90 - (90 / 회전속도) * time) * innerHeight) /
          innerWidth;
      caculatedY = y * 100 + 반지름 * Math.sin(90 - (90 / 회전속도) * time);
    } else {
      caculatedX = x * 100 + 반지름 * Math.cos(90 - (90 / 회전속도) * time);
      caculatedY =
        y * 100 +
        (반지름 * Math.sin(90 - (90 / 회전속도) * time) * innerWidth) /
          innerHeight;
    }

    text.style.clipPath = `circle(${원의크기}% at ${caculatedX}% ${caculatedY}%)`;
    time++;
  }, 16);

  mode = "blackCircle";
  data.section_1.$section_1.classList.add("active");
  data.section_2.$section_2.classList.add("active");
  $article_4.classList.add("active");
  $article_2.classList.remove("active");
  scrollBottom();
  window.addEventListener("touchmove", moveEvent);
  window.addEventListener("mousemove", moveEvent);
  window.addEventListener("click", circleExpandMode);
};
const resetMode = () => {
  const {
    section_3: { $article_2, $article_3, $article_4 },
  } = data;

  mode = "default";
  $article_2.classList.remove("active");
  data.section_3.$section_3.style.overflow = "hidden";
  data.section_3.$article_2.style.display = "flex";
  data.section_3.$article_4.style.display = "flex";
  $article_2.style.overflow = "hidden";
  $article_4.style.overflow = "hidden";
  data.section_1.$section_1.classList.remove("active");
  data.section_2.$section_2.classList.remove("active");
  $article_4.classList.remove("active");
  window.removeEventListener("touchmove", moveEvent);
  window.removeEventListener("mousemove", moveEvent);
  document.querySelector(".article_2 .text").style.height = "100vh";
  document.querySelector(".article_4 .text").style.height = "100vh";
  clearInterval(interval);
  scrollBottom();
};
document.querySelector(".button_1").addEventListener("click", blackCircleMode);
document.querySelector(".button_2").addEventListener("click", blackCircleMode2);
document.querySelector(".article_2_back").addEventListener("click", resetMode);
document.querySelector(".article_4_back").addEventListener("click", resetMode);
data.section_2.$circle.addEventListener("click", resetMode);

/**
 * scroll event
 */
const scrollEvent = () => {
  const { scrollY, innerHeight } = window;

  if (scrollY < data.section_1.heightNum * innerHeight) {
    // In Praise of Shadows
    const {
      section_1: {
        text: { $text, startRatio, halfRatio, endRatio },
        heightNum,
      },
    } = data;
    const ratio = (scrollY / (heightNum * innerHeight)).toFixed(2);

    if (startRatio >= ratio) {

    } else if (halfRatio >= ratio && ratio > startRatio) {

    } else if (endRatio >= ratio && ratio > halfRatio) {
      // 글자가 사라지는 부분
      const partialRatio = (
        (ratio - halfRatio) /
        (endRatio - halfRatio)
      ).toFixed(2);

      $text.style.opacity = 1 - partialRatio;
      $text.style.transform = `translateY(-${partialRatio * 50 + 50}%)`;
    } else if (ratio > endRatio) {
      // 글자가 사라진 후
      $text.style.opacity = 0;
      $text.style.transform = `translateY(-100%)`;
    }
  }

  if (
    scrollY <
    (data.section_1.heightNum + data.section_2.heightNum) * innerHeight
  ) {
    // JUNICHIRO TANIZAKI
    const {
      section_2: {
        text: {
          $text,
          startRatio,
          step_1_ratio,
          step_2_ratio,
          step_3_ratio,
          endRatio,
        },
        $circle,
        heightNum,
      },
    } = data;

    const ratio = (
      (scrollY - data.section_1.heightNum * innerHeight) /
      (heightNum * innerHeight)
    ).toFixed(2);

    $text.style.transition = `all 0.5s ease`;

    if (startRatio >= ratio) {
      // 글자가 나타나기 전
      $text.style.opacity = 0;
      $text.style.transform = `translateY(0)`;
    } else if (step_1_ratio >= ratio && ratio > startRatio) {
      // 글자가 나타나는 부분
      const partialRatio = (
        (ratio - startRatio) /
        (step_1_ratio - startRatio)
      ).toFixed(2);

      $text.style.opacity = partialRatio;
      $text.style.transform = `translateY(-${partialRatio * 50}%)`;
    } else {
      $text.style.opacity = 1;
      $text.style.transform = `translateY(-50%) scale(1)`;
    }

    if (step_2_ratio >= ratio && ratio > step_1_ratio) {
      // 일부 글자가 사라지는 부분
      const partialRatio = (
        (ratio - step_1_ratio) /
        (step_2_ratio - step_1_ratio)
      ).toFixed(2);

      document.querySelectorAll(".section_2 .hide").forEach((el, index) => {
        el.style.opacity = 1 - partialRatio;
        el.style.width = `${hide_widths[index]}px`;
      });
    } else if (step_3_ratio >= ratio && ratio > step_2_ratio) {
      // 나머지 글자가 합쳐지는 부분
      const partialRatio = (
        (ratio - step_2_ratio) /
        (step_3_ratio - step_2_ratio)
      ).toFixed(2);

      document.querySelectorAll(".section_2 .hide").forEach((el, index) => {
        el.style.opacity = 0;
        el.style.width = `${hide_widths[index] * (1 - partialRatio)}px`;
      });
    } else if (ratio > step_3_ratio) {
      document.querySelectorAll(".section_2 .hide").forEach((el) => {
        el.style.opacity = 0;
        el.style.width = `0px`;
      });
    }

    if (endRatio >= ratio && ratio > step_3_ratio) {
      // 글자 뒤로 원이 생기는 부분
      const partialRatio = (
        (ratio - step_3_ratio) /
        (endRatio - step_3_ratio)
      ).toFixed(2);

      $text.classList.remove("floating");
      $circle.style.width = `${show_width_sum * partialRatio * 1.1}px`;
    } else if (ratio > endRatio) {
      // 글자 뒤로 원이 생긴 후
      $text.classList.add("floating");
      $text.style.transform = `translateY(-50%) scale(0.5)`;
      $circle.style.width = `${show_width_sum * 1.1}px`;
    } else {
      $circle.style.width = `0`;
      $text.classList.remove("floating");
    }
  } else {
    const {
      section_2: {
        text: { $text },
        $circle,
      },
    } = data;

    $circle.style.width = `${show_width_sum * 1.1}px`;
    $text.style.transition = `none`;
    $text.classList.add("floating");
    $text.style.opacity = 1;
    $text.style.transform = `translateY(-50%) scale(0.5)`;
    document.querySelectorAll(".section_2 .hide").forEach((el) => {
      el.style.opacity = 0;
      el.style.width = `0px`;
    });
  }
};


scrollEvent();
addEventListener("scroll", scrollEvent);
addEventListener("resize", () => {
  scrollEvent();
  if (mode !== "default") {
    scrollBottom();
  }
});
