import { Fragment, useEffect, useRef, useState, type CSSProperties, type UIEvent } from 'react'
import { education, experiences, projects, skillGroups } from '../data/portfolio'

function HomePage() {
  const [carouselIndexByProject, setCarouselIndexByProject] = useState<Record<string, number>>({})

  // Tracks a button-driven smooth scroll that is still animating, per project.
  const pendingScrollRef = useRef<Record<string, { target: number; timer: number }>>({})

  useEffect(
    () => () => {
      Object.values(pendingScrollRef.current).forEach(({ timer }) => window.clearTimeout(timer))
    },
    [],
  )

  const handleCarouselScroll = (projectName: string, event: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = event.currentTarget
    if (!clientWidth) {
      return
    }

    const index = Math.round(scrollLeft / clientWidth)
    const pending = pendingScrollRef.current[projectName]

    if (pending) {
      // Mid-animation the scroll position still rounds to the *previous* slide, which
      // would knock the counter, chip and dots back and forth. Ignore those frames and
      // only accept the position once the animation lands on the slide we asked for.
      if (index !== pending.target) {
        return
      }

      window.clearTimeout(pending.timer)
      delete pendingScrollRef.current[projectName]
    }

    setCarouselIndexByProject((prev) => {
      if (prev[projectName] === index) {
        return prev
      }

      return {
        ...prev,
        [projectName]: index,
      }
    })
  }

  const handleCarouselStep = (
    carouselId: string,
    projectName: string,
    direction: -1 | 1,
    imageCount: number,
  ) => {
    const carousel = document.getElementById(carouselId)
    if (!carousel || imageCount <= 1) {
      return
    }

    const slideWidth = carousel.clientWidth
    if (!slideWidth) {
      return
    }

    const pending = pendingScrollRef.current[projectName]
    // Step from the slide we're heading to, so rapid clicks chain (0 -> 1 -> 2) instead
    // of both resolving against the same stale index.
    const currentIndex =
      pending?.target ?? carouselIndexByProject[projectName] ?? Math.round(carousel.scrollLeft / slideWidth)
    const nextIndex = Math.min(imageCount - 1, Math.max(0, currentIndex + direction))

    if (nextIndex === currentIndex) {
      return
    }

    if (pending) {
      window.clearTimeout(pending.timer)
    }

    // If the animation is interrupted (a swipe part-way through) the target may never be
    // reached, so stop suppressing scroll updates after it would normally have settled.
    pendingScrollRef.current[projectName] = {
      target: nextIndex,
      timer: window.setTimeout(() => {
        delete pendingScrollRef.current[projectName]
      }, 900),
    }

    carousel.scrollTo({
      left: nextIndex * slideWidth,
      behavior: 'smooth',
    })

    setCarouselIndexByProject((prev) => ({
      ...prev,
      [projectName]: nextIndex,
    }))
  }

  return (
    <>
      <section className="hero-content sectionless">
        <h1 className="reveal">Jeff Tan</h1>
        <p className="intro reveal" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
          I’m a <span className="ai-gradient-text ai-shimmer-text" data-text="senior software engineer">senior software engineer</span> specializing in Android development, with extensive experience building scalable, high-performance mobile applications from concept to production. I focus on clean architecture, maintainable codebases, and user-centric design, and I enjoy solving complex real-world problems in production environments.
        </p>
        <div className="hero-badges reveal" style={{ '--reveal-delay': '160ms' } as CSSProperties}>
          <span className="pill">Senior Android Software Engineer</span>
          <span className="pill">AWS Certified Solutions Architect</span>
          <span className="pill">Kotlin Multiplatform Mobile App Developer</span>
        </div>
        <div
          className="hero-social reveal"
          aria-label="Social links"
          style={{ '--reveal-delay': '240ms' } as CSSProperties}
        >
            <a
              className="social-link"
              href="https://github.com/jiahan8"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1.5A10.5 10.5 0 0 0 8.68 22c.52.1.7-.22.7-.5v-1.9c-2.86.62-3.47-1.21-3.47-1.21-.46-1.14-1.13-1.44-1.13-1.44-.92-.62.07-.61.07-.61 1.02.08 1.55 1.03 1.55 1.03.9 1.53 2.37 1.09 2.95.83.09-.64.35-1.08.63-1.33-2.29-.26-4.7-1.12-4.7-4.97 0-1.1.4-2 1.03-2.7-.1-.26-.45-1.32.1-2.75 0 0 .85-.27 2.78 1.03a9.77 9.77 0 0 1 5.06 0c1.93-1.3 2.78-1.03 2.78-1.03.55 1.43.2 2.49.1 2.75.64.7 1.03 1.6 1.03 2.7 0 3.86-2.41 4.7-4.72 4.96.37.31.69.93.69 1.88v2.78c0 .28.19.61.7.5A10.5 10.5 0 0 0 12 1.5Z" />
              </svg>
            </a>
            <a
              className="social-link"
              href="https://www.linkedin.com/in/jiahant"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.5 9.7h2.86v8.8H5.5V9.7Zm4.66 0h2.74v1.2h.04c.38-.72 1.32-1.48 2.73-1.48 2.92 0 3.46 1.87 3.46 4.3v4.78h-2.86v-4.23c0-1.01-.02-2.3-1.44-2.3-1.44 0-1.66 1.1-1.66 2.22v4.31h-2.86V9.7Z" />
              </svg>
            </a>
            <a
              className="social-link"
              href="https://play.google.com/store/apps/details?id=com.jiahan.smartcamera"
              target="_blank"
              rel="noreferrer"
              aria-label="Google Play"
              title="Google Play"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.3 3.1c-.3.3-.5.8-.5 1.5v14.8c0 .7.2 1.2.5 1.5l.1.1 8.3-8.3V12L4.4 3l-.1.1Zm11.1 5.5-2.7 2.7v1.4l2.7 2.7.1-.1 3.2-1.8c.9-.5.9-1.4 0-1.9l-3.2-1.8-.1.1ZM15 16.1l-2.8-2.8-8.2 8.2c.4.4 1 .4 1.8 0l9.2-5.2Zm-9.2-14c-.8-.4-1.4-.4-1.8 0l8.2 8.2L15 7.5 5.8 2.1Z" />
              </svg>
          </a>
        </div>
        <div className="hero-metrics reveal" style={{ '--reveal-delay': '320ms' } as CSSProperties}>
          <p>
            <strong>8+ Years</strong>
            <span>Mobile App Development</span>
          </p>
          <p>
            <strong>Android Focus</strong>
            <span>Kotlin, Java, Jetpack</span>
          </p>
          <p>
            <strong>Cloud & Backend</strong>
            <span>AWS, Firebase</span>
          </p>
        </div>
      </section>

      <section className="section reveal" id="about">
        <header className="section-head">
          <p className="section-kicker">01 — Profile</p>
          <h2>About Me</h2>
        </header>
        <p>
          I primarily work with Kotlin and modern Android frameworks, with deep experience building
          production-ready Android applications using MVVM architecture, Jetpack Compose, and
          Android Jetpack libraries.
        </p>
        <p>
          I emphasize code quality, testability, performance optimization, and long-term
          maintainability, and I collaborate closely with cross-functional teams to deliver
          features that create real business impact.
        </p>
        <p>
          Beyond mobile development, I’m an <a
            href="https://www.credly.com/badges/93650bb6-34c1-4e8f-a91f-0872e3013ff3"
            target="_blank"
            rel="noreferrer"
            className="ai-gradient-text ai-shimmer-text ai-shimmer-delayed"
            data-text="AWS Certified Solutions Architect"
          >
            AWS Certified Solutions Architect
          </a> with hands-on
          experience designing highly available, scalable, secure, and cost-effective cloud
          infrastructure on AWS.
        </p>
        <p>
          I also enjoy full product ownership. I've designed, built, and published an{' '}
          <a
            href="https://play.google.com/store/apps/details?id=com.jiahan.smartcamera"
            target="_blank"
            rel="noreferrer"
            className="about-link"
          >
            Android app on Google Play
          </a>
          , managing the full lifecycle from development and testing to release and maintenance.
        </p>

        {skillGroups.map((group) => (
          <Fragment key={group.title}>
            <h3 className="about-subtitle">{group.title}</h3>
            <div className="tech-stack skill-pills">
              {group.skills.map((skill) => (
                <span key={skill} className="tech-pill">
                  {skill}
                </span>
              ))}
            </div>
          </Fragment>
        ))}

        <h3 className="about-subtitle">Projects & Experiments</h3>
        <ul className="about-list">
          <li>
            <a href="https://www.credly.com/users/jiahan" target="_blank" rel="noreferrer" className="about-link">
              Credly Profile
            </a>
          </li>
          <li>
            <a
              href="https://play.google.com/store/apps/details?id=com.jiahan.smartcamera"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              Google Play App
            </a>
          </li>
          <li>
            <a href="https://github.com/jiahan8" target="_blank" rel="noreferrer" className="about-link">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://jiahan8.github.io" target="_blank" rel="noreferrer" className="about-link">
              Portfolio Website
            </a>
          </li>
        </ul>
        <p className="contact-line">
          Contact —{' '}
          <a href="mailto:jiahantan96@gmail.com" className="about-link">
            jiahantan96@gmail.com
          </a>
        </p>
        <div className="cert-item">
          <h4>
            <span className="cert-icon" aria-hidden="true">
              <img src="/images/aws-certified-saa.png" alt="" loading="lazy" decoding="async" />
            </span>
            AWS Certified Solutions Architect – Associate
          </h4>
          <a
            href="https://www.credly.com/badges/93650bb6-34c1-4e8f-a91f-0872e3013ff3"
            target="_blank"
            rel="noreferrer"
          >
            View Credential
          </a>
        </div>
      </section>

      <section className="section reveal" id="education">
        <header className="section-head">
          <p className="section-kicker">02 — Background</p>
          <h2>Education</h2>
        </header>
        <article className="education-card">
          <h3>{education.degree}</h3>
          <div className="education-meta-row">
            {education.image ? (
              <img
                src={education.image}
                alt={education.imageAlt ?? education.school}
                className="school-logo-inline"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <p className="meta">
              {education.school} · {education.period}
            </p>
          </div>
          <p>{education.summary}</p>
          <h4 className="course-title">Relevant Courses</h4>
          <div className="tech-stack course-list">
            {education.courses.map((course) => (
              <span key={course} className="tech-pill">
                {course}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="section threads-section reveal" id="experience">
        <header className="section-head">
          <p className="section-kicker">03 — Track record</p>
          <h2>Work Experience</h2>
          <p className="section-subtitle">Eight years shipping Android at production scale.</p>
        </header>
        <div className="threads-feed">
          {experiences.map((experience, index) => (
            <article
              key={experience.role + experience.company}
              className="thread-item reveal"
              style={{ '--reveal-delay': `${Math.min(index, 4) * 70}ms` } as CSSProperties}
            >
              <div className="thread-rail" aria-hidden="true">
                <img src="/images/me.jpg" alt="" className="thread-avatar" loading="lazy" decoding="async" />
                {index < experiences.length - 1 ? <span className="thread-line" /> : null}
              </div>
              <div className="thread-bubble">
                <div className="thread-head">
                  <p className="thread-author">{experience.role}</p>
                  <p className="thread-time">{experience.period}</p>
                </div>
                <h3 className="thread-role">{experience.company}</h3>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="thread-actions" aria-hidden="true">
                  <span className="thread-action" title="Like">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 20.6c-4.1-3.1-7.5-5.8-7.5-9.4A4.2 4.2 0 0 1 8.7 7c1.5 0 2.7.7 3.3 1.8.6-1.1 1.8-1.8 3.3-1.8a4.2 4.2 0 0 1 4.2 4.2c0 3.6-3.4 6.3-7.5 9.4Z" />
                    </svg>
                  </span>
                  <span className="thread-action" title="Comment">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5.5 17.2V8.7A3.2 3.2 0 0 1 8.7 5.5h6.6a3.2 3.2 0 0 1 3.2 3.2V13a3.2 3.2 0 0 1-3.2 3.2H10l-4.5 4.3v-3.3Z" />
                    </svg>
                  </span>
                  <span className="thread-action" title="Repost">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.5 8.3h9.7m0 0-2.4-2.4m2.4 2.4-2.4 2.4M17.5 15.7H7.8m0 0 2.4-2.4m-2.4 2.4 2.4 2.4" />
                    </svg>
                  </span>
                  <span className="thread-action" title="Send">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m20 4-8.2 16-1.8-6.2L4 12.1 20 4Z" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal" id="projects">
        <header className="section-head">
          <p className="section-kicker">04 — Off the clock</p>
          <h2>Side Projects</h2>
          <p className="section-subtitle">Personal work shipped to the Google Play Store.</p>
        </header>
        <div className="project-feed">
          {projects.map((project, projectIndex) => {
            const imageList = project.images ?? (project.image ? [project.image] : [])
            const activeSlide = Math.min(
              carouselIndexByProject[project.name] ?? 0,
              Math.max(imageList.length - 1, 0),
            )
            const carouselId = `insta-carousel-${projectIndex}`
            const slideLabel = project.imageCaptions?.[activeSlide]

            return (
            <article key={project.name} className="insta-post">
              <header className="insta-head">
                <div className="insta-profile">
                  <img src="/images/me.jpg" alt="Jeff Tan" className="insta-avatar" loading="lazy" decoding="async" />
                  <div className="insta-profile-meta">
                    <p className="insta-handle">jeffjiahan</p>
                    <p className="insta-subline">Android Project</p>
                  </div>
                </div>
              </header>

              {imageList.length > 0 && project.link ? (
                <div className="insta-media-wrap">
                  <div
                    id={carouselId}
                    className="insta-carousel"
                    role="group"
                    aria-label={`${project.name} screenshots`}
                    onScroll={(event) => handleCarouselScroll(project.name, event)}
                  >
                    {imageList.map((image, index) => (
                      <a
                        key={image}
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="insta-media-link"
                      >
                        <img
                          src={image}
                          alt={
                            project.imageCaptions?.[index]
                              ? `${project.name} — ${project.imageCaptions[index]}`
                              : `${project.imageAlt ?? project.name} ${index + 1}`
                          }
                          className="insta-media"
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </a>
                    ))}
                  </div>
                  {imageList.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="insta-nav insta-nav-prev"
                        aria-label="Previous image"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          handleCarouselStep(carouselId, project.name, -1, imageList.length)
                        }}
                        disabled={activeSlide === 0}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="insta-nav insta-nav-next"
                        aria-label="Next image"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          handleCarouselStep(carouselId, project.name, 1, imageList.length)
                        }}
                        disabled={activeSlide === imageList.length - 1}
                      >
                        ›
                      </button>
                      <span className="insta-media-counter">
                        {activeSlide + 1}/{imageList.length}
                      </span>
                      <div className="insta-dots" aria-hidden="true">
                        {imageList.map((image, index) => (
                          <span
                            key={`${image}-dot`}
                            className={`insta-dot ${index === activeSlide ? 'is-active' : ''}`}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}

              <div className="insta-actions" aria-hidden="true">
                <div className="insta-actions-left">
                  <span className="insta-action" title="Like">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 20.6c-4.1-3.1-7.5-5.8-7.5-9.4A4.2 4.2 0 0 1 8.7 7c1.5 0 2.7.7 3.3 1.8.6-1.1 1.8-1.8 3.3-1.8a4.2 4.2 0 0 1 4.2 4.2c0 3.6-3.4 6.3-7.5 9.4Z" />
                    </svg>
                  </span>
                  <span className="insta-action" title="Comment">
                    <svg viewBox="0 0 24 24">
                      <path d="M5.5 17.2V8.7A3.2 3.2 0 0 1 8.7 5.5h6.6a3.2 3.2 0 0 1 3.2 3.2V13a3.2 3.2 0 0 1-3.2 3.2H10l-4.5 4.3v-3.3Z" />
                    </svg>
                  </span>
                  <span className="insta-action" title="Send">
                    <svg viewBox="0 0 24 24">
                      <path d="m20 4-8.2 16-1.8-6.2L4 12.1 20 4Z" />
                    </svg>
                  </span>
                </div>
                <span className="insta-action" title="Save">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 4.8h10a1 1 0 0 1 1 1v13.4l-6-3.6-6 3.6V5.8a1 1 0 0 1 1-1Z" />
                  </svg>
                </span>
              </div>

              <div className="insta-caption">
                <p>
                  <strong>{project.name}</strong> {project.summary}
                </p>
                {slideLabel ? (
                  <p className="insta-slide-label" key={slideLabel}>
                    <span className="insta-slide-index">
                      {String(activeSlide + 1).padStart(2, '0')}
                    </span>
                    {slideLabel}
                  </p>
                ) : null}
              </div>

              <div className="tech-stack insta-tags">
                {project.stack.split(',').map((item) => (
                  <span key={item.trim()} className="tech-pill">
                    {item.trim()}
                  </span>
                ))}
              </div>

              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="insta-link">
                  View on Google Play
                </a>
              ) : null}
            </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default HomePage
