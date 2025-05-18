        document.addEventListener('DOMContentLoaded', function() {
            gsap.registerPlugin(ScrollTrigger, Draggable);
            
            gsap.utils.toArray('.post').forEach((post, i) => {
                gsap.from(post, {
                    scrollTrigger: {
                        trigger: post,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "back.out(1)"
                });
            });
            
            gsap.from('.stories', {
                scrollTrigger: {
                    trigger: '.stories',
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.6
            });
            
            gsap.utils.toArray('.story').forEach((story, i) => {
                gsap.from(story, {
                    scrollTrigger: {
                        trigger: story,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    x: i % 2 === 0 ? -30 : 30,
                    duration: 0.5,
                    delay: i * 0.1
                });
            });
            
            gsap.utils.toArray('.trending-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    x: -50,
                    duration: 0.5,
                    delay: i * 0.1
                });
            });
            
            gsap.utils.toArray('.user-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    x: 50,
                    duration: 0.5,
                    delay: i * 0.1
                });
            });
            
            Draggable.create(".stories", {
                type: "x",
                bounds: ".main-content",
                edgeResistance: 0.8,
                inertia: true,
                onDragEnd: function() {
                    gsap.to(this.target, {
                        x: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)"
                    });
                }
            });
            
            const likeButtons = document.querySelectorAll('.like-btn');
            likeButtons.forEach(button => {
                const emojiReactions = button.querySelector('.emoji-reactions');
                
                button.addEventListener('mouseenter', () => {
                    gsap.fromTo(emojiReactions, 
                        { opacity: 0, y: 10, display: 'none' },
                        { opacity: 1, y: 0, display: 'block', duration: 0.3 }
                    );
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(emojiReactions, 
                        { opacity: 0, y: 10, display: 'none', duration: 0.3 }
                    );
                });
                
                const emojis = emojiReactions.querySelectorAll('span');
                emojis.forEach(emoji => {
                    emoji.addEventListener('mouseenter', () => {
                        gsap.to(emoji, {
                            scale: 1.4,
                            y: -5,
                            duration: 0.2
                        });
                    });
                    
                    emoji.addEventListener('mouseleave', () => {
                        gsap.to(emoji, {
                            scale: 1,
                            y: 0,
                            duration: 0.2
                        });
                    });
                    
                    emoji.addEventListener('click', (e) => {
                        e.stopPropagation();
                        
                        const icon = button.querySelector('i');
                        const text = button.querySelector('span:not(.emoji-reactions span)');
                        
                        const flyingEmoji = document.createElement('div');
                        flyingEmoji.textContent = emoji.textContent;
                        flyingEmoji.style.position = 'absolute';
                        flyingEmoji.style.fontSize = '24px';
                        flyingEmoji.style.pointerEvents = 'none';
                        flyingEmoji.style.left = `${e.clientX}px`;
                        flyingEmoji.style.top = `${e.clientY}px`;
                        document.body.appendChild(flyingEmoji);
                        
                        gsap.to(flyingEmoji, {
                            x: gsap.utils.random(-50, 50),
                            y: -100,
                            opacity: 0,
                            scale: 2,
                            duration: 1,
                            onComplete: () => flyingEmoji.remove()
                        });
                        
                        button.classList.add('liked');
                        icon.className = 'fas fa-thumbs-up';
                        text.textContent = emoji.textContent === '❤️' ? 'Love' : 
                                           emoji.textContent === '😂' ? 'Haha' :
                                           emoji.textContent === '😮' ? 'Wow' :
                                           emoji.textContent === '😢' ? 'Sad' :
                                           emoji.textContent === '😡' ? 'Angry' : 'Liked';
                        
                        gsap.to(emojiReactions, 
                            { opacity: 0, y: 10, display: 'none', duration: 0.3 }
                        );
                        
                        const likesCount = button.closest('.post').querySelector('.likes span');
                        likesCount.textContent = parseInt(likesCount.textContent) + 1;
                        
                        gsap.to(likesCount, {
                            scale: 1.5,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1
                        });
                    });
                });
                
                button.addEventListener('click', () => {
                    if (!button.classList.contains('liked')) {
                        button.classList.add('liked');
                        const icon = button.querySelector('i');
                        const text = button.querySelector('span:not(.emoji-reactions span)');
                        icon.className = 'fas fa-thumbs-up';
                        text.textContent = 'Liked';
                        
                        const likesCount = button.closest('.post').querySelector('.likes span');
                        likesCount.textContent = parseInt(likesCount.textContent) + 1;
                        
                        gsap.to(likesCount, {
                            scale: 1.5,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1
                        });
                    }
                });
            });
            
            const scrollToTopBtn = document.querySelector('.scroll-to-top');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    gsap.to(scrollToTopBtn, {
                        opacity: 1,
                        duration: 0.3
                    });
                    scrollToTopBtn.classList.add('visible');
                } else {
                    gsap.to(scrollToTopBtn, {
                        opacity: 0,
                        duration: 0.3
                    });
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            scrollToTopBtn.addEventListener('click', () => {
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 0.8,
                    ease: "power2.inOut"
                });
            });
            
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        gsap.to(window, {
                            scrollTo: {
                                y: targetElement,
                                offsetY: 80
                            },
                            duration: 0.8,
                            ease: "power2.inOut"
                        });
                    }
                });
            });
            
            const notificationBadges = document.querySelectorAll('.notification-badge');
            notificationBadges.forEach(badge => {
                gsap.to(badge, {
                    scale: 1.2,
                    duration: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            });
            
            const followButtons = document.querySelectorAll('.follow-btn');
            followButtons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.05,
                        duration: 0.2
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.2
                    });
                });
                
                button.addEventListener('click', () => {
                    if (!button.classList.contains('following')) {
                        gsap.to(button, {
                            scale: 0.9,
                            duration: 0.1,
                            yoyo: true,
                            repeat: 1,
                            onComplete: () => {
                                button.textContent = 'Following';
                                button.classList.add('following');
                            }
                        });
                    } else {
                        gsap.to(button, {
                            scale: 0.9,
                            duration: 0.1,
                            yoyo: true,
                            repeat: 1,
                            onComplete: () => {
                                button.textContent = 'Follow';
                                button.classList.remove('following');
                            }
                        });
                    }
                });
            });
            
            const modal = document.getElementById('imageModal');
            const modalImg = modal.querySelector('img');
            const modalClose = modal.querySelector('.modal-close');
            const postImages = document.querySelectorAll('.post-image');
            
            postImages.forEach(img => {
                img.addEventListener('click', () => {
                    modal.style.display = 'flex';
                    modalImg.src = img.src;
                    
                    gsap.fromTo(modal.querySelector('.modal-content'), 
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.3 }
                    );
                });
            });
            
            modalClose.addEventListener('click', () => {
                gsap.to(modal.querySelector('.modal-content'), {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                    onComplete: () => {
                        modal.style.display = 'none';
                    }
                });
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    gsap.to(modal.querySelector('.modal-content'), {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.2,
                        onComplete: () => {
                            modal.style.display = 'none';
                        }
                    });
                }
            });
            
            const stories = document.querySelectorAll('.story:not(.create-story)');
            stories.forEach(story => {
                story.addEventListener('mouseenter', () => {
                    gsap.to(story.querySelector('.story-bg'), {
                        scale: 1.05,
                        duration: 0.3
                    });
                    
                    gsap.to(story.querySelector('.story-avatar'), {
                        scale: 1.1,
                        duration: 0.3
                    });
                });
                
                story.addEventListener('mouseleave', () => {
                    gsap.to(story.querySelector('.story-bg'), {
                        scale: 1,
                        duration: 0.3
                    });
                    
                    gsap.to(story.querySelector('.story-avatar'), {
                        scale: 1,
                        duration: 0.3
                    });
                });
                
                story.addEventListener('click', () => {
                    gsap.to(story, {
                        scale: 0.95,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1
                    });
                });
            });
            
            const createStory = document.querySelector('.create-story');
            createStory.addEventListener('click', () => {
                gsap.to(createStory, {
                    scale: 0.95,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            });
            
            const postOptions = document.querySelectorAll('.post-options');
            postOptions.forEach(option => {
                option.addEventListener('click', () => {
                    gsap.to(option, {
                        rotate: 90,
                        duration: 0.3
                    });
                });
            });
            
            const searchInput = document.querySelector('.search-bar input');
            searchInput.addEventListener('focus', () => {
                gsap.to('.search-bar', {
                    scale: 1.02,
                    duration: 0.2
                });
            });
            
            searchInput.addEventListener('blur', () => {
                gsap.to('.search-bar', {
                    scale: 1,
                    duration: 0.2
                });
            });
            
            const userMenu = document.querySelector('.user-menu img');
            userMenu.addEventListener('click', () => {
                gsap.to(userMenu, {
                    scale: 0.9,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            });
            
            const menuItems = document.querySelectorAll('.sidebar-menu ul li a');
            menuItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        x: 5,
                        duration: 0.2
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        x: 0,
                        duration: 0.2
                    });
                });
            });
        });