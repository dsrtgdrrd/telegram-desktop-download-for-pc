# SoftsMac Landing Page

## Overview

SoftsMac is a software download landing page featuring a modern, futuristic design with animated backgrounds and a countdown download experience. The project consists of a main landing page that leads to a download preparation page with a timed redirect mechanism. It focuses on creating an engaging user experience through smooth animations, particle effects, and professional visual design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML/CSS/JavaScript**: Pure frontend implementation without server-side dependencies
- **Multi-page Structure**: Separate pages for landing (`index.html`) and download preparation (`download.html`)
- **Component-based CSS**: Modular styling with CSS custom properties for consistent theming
- **Class-based JavaScript**: Object-oriented particle system for performance and maintainability

### Animation System
- **Particle Animation**: Custom JavaScript particle system with device-responsive particle counts
- **CSS Animations**: Hardware-accelerated CSS transforms and transitions for smooth performance
- **Progressive Enhancement**: Graceful degradation for lower-performance devices

### Design Architecture
- **Futuristic Theme**: Dark color scheme with neon accents (blues, purples, electric greens)
- **Responsive Design**: Mobile-first approach with breakpoint-based optimizations
- **Performance Optimization**: Particle count adjustment based on screen size to maintain 60fps

### User Experience Flow
- **Landing Page**: Single call-to-action leading to download preparation
- **Download Page**: Countdown timer with visual feedback before redirect
- **Visual Feedback**: Loading animations and status messages for user engagement

## External Dependencies

### Fonts
- **Google Fonts**: Poppins font family (weights: 300, 400, 600, 700) for consistent typography across all devices

### No Backend Dependencies
- Pure client-side implementation requiring only static file hosting
- No database, server-side processing, or API integrations required
- Self-contained JavaScript animations without external libraries