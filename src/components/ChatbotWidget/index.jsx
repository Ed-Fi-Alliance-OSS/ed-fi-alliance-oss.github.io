// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * AI Chatbot Widget Component
 * Renders a floating iframe that loads the chatbot widget.
 * Uses lazy loading to improve initial page load performance.
 *
 * Environment Variables:
 * - CHATBOT_WIDGET_URL: The URL of the chatbot widget (defaults to localhost:3080 for development)
 *   Set this in your build environment or CI/CD pipeline.
 */
const ChatbotWidget = () => {
  const { siteConfig } = useDocusaurusContext();
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Read widget URL from Docusaurus site config (injected at build time)
  const WIDGET_URL = siteConfig.customFields.chatbotWidgetUrl;

  // Derive the origin from the widget URL for security validation
  const widgetOrigin = new URL(WIDGET_URL).origin;

  useEffect(() => {
    // Lazy load the iframe after a short delay to ensure main content loads first
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 1000); // 1 second delay for lazy loading

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Listen for postMessage events from the widget iframe
    const handleMessage = (event) => {
      // Validate origin for security (update in production)
      if (event.origin !== widgetOrigin) {
        return;
      }

      // Handle minimize/maximize state changes
      if (event.data?.type === 'ed-fi-chat-minimized') {
        setIsMinimized(true);
      } else if (event.data?.type === 'ed-fi-chat-maximized') {
        setIsMinimized(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [widgetOrigin]);

  return (
    <div className={styles.chatbotContainer}>
      {shouldLoadIframe && (
        <iframe
          src={WIDGET_URL}
          className={`${styles.chatbotIframe} ${isMinimized ? styles.minimized : ''}`}
          title="AI Chatbot Widget"
          allow="microphone"
          sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ChatbotWidget;
