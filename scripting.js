function libraries(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
libraries();


function mousefollower(){
    window.addEventListener('mousemove', function(dets){
        document.querySelector('#cursor').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)` 
    })
}
mousefollower()
    
let tl1 = gsap.timeline();
tl1.from('.nav', {
    y: -50,
    opacity: 0,
    duration: 1,
})
    .from('.heading1, .heading2',{
    y: 10,
    rotate: 10,
    opacity: 0,
    duration: 1

})
    .from('.herovideo', {
    y:100,
    opacity: 0,
    duration: 0.7
})

let tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: '.page1 .heading1',
        scroller: '.main',
        // markers: true,
        start: 'top 27%',
        end: 'bottom 80',
        scrub: 3 
    }
})

tl2.to('.heading1', {
    x:-90,
}, 'anim')
    .to('.heading2', {
        x:90,
    }, 'anim')

    .to('.herovideo', {
        width: '100%',
        duration: 2
    }, 'anim')


let tl3 = gsap.timeline({
    scrollTrigger:{
        trigger: '.page1 .heading1',
        scroller: '.main',
        // markers: true,
        start: 'top -115%',
        end: 'top -120%',
        scrub: 3 
    }
})

tl3.to('.main',{
    backgroundColor: '#fff'
})
let tl4 = gsap.timeline({
    scrollTrigger:{
        trigger: '.page1 .heading1',
        scroller: '.main',
        // markers: true,
        start: 'top -480%',
        end: 'top -520%',
        scrub: 3 
    }
})

tl4.to('.main',{
    backgroundColor: '#0F0D0D'
})

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot ),
      });
    });
  });
  