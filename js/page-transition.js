/**
 * 页面3D翻转动画效果
 */

(function() {
  'use strict';

  // 页面加载完成后添加动画类
  function addLoadedClass() {
    const contentInner = document.querySelector('#content-inner');
    const pageHeader = document.querySelector('#page-header:not(.full_page)');
    const footer = document.querySelector('#footer');
    const asideContent = document.querySelector('#aside-content');

    if (contentInner) {
      setTimeout(() => {
        contentInner.classList.add('loaded');
      }, 100);
    }

    if (pageHeader) {
      setTimeout(() => {
        pageHeader.classList.add('loaded');
      }, 200);
    }

    if (asideContent) {
      setTimeout(() => {
        asideContent.classList.add('loaded');
      }, 300);
    }

    if (footer) {
      setTimeout(() => {
        footer.classList.add('loaded');
      }, 400);
    }
  }

  // Pjax 发送时添加离开动画
  function addLeavingClass() {
    const contentInner = document.querySelector('#content-inner');
    const pageHeader = document.querySelector('#page-header:not(.full_page)');

    if (contentInner) {
      contentInner.classList.remove('loaded');
      contentInner.classList.add('leaving');
    }

    if (pageHeader) {
      pageHeader.classList.remove('loaded');
      pageHeader.classList.add('leaving');
    }
  }

  // 初始化
  function init() {
    // 页面首次加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addLoadedClass);
    } else {
      addLoadedClass();
    }

    // Pjax 事件监听
    if (window.pjax) {
      document.addEventListener('pjax:send', addLeavingClass);
      document.addEventListener('pjax:complete', addLoadedClass);
    }
  }

  // 注册全局函数
  if (window.btf) {
    window.btf.addGlobalFn('pjaxComplete', addLoadedClass, 'pageTransitionLoaded');
    window.btf.addGlobalFn('pjaxSend', addLeavingClass, 'pageTransitionLeaving');
  }

  // 启动
  init();
})();
