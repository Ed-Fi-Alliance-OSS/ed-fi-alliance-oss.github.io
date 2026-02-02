// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

/**
 * AI Chatbot Widget Component
 * Renders a floating iframe that loads the chatbot widget.
 * Uses lazy loading to improve initial page load performance.
 *
 * NOTE: The widget URL is currently set to localhost for development.
 * Update WIDGET_URL to production server before deploying to production.
 */
const ChatbotWidget = () => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  // TODO: Change this URL to production server when ready
  const WIDGET_URL = 'http://localhost:3080/widget/';

  useEffect(() => {
    // Lazy load the iframe after a short delay to ensure main content loads first
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 1000); // 1 second delay for lazy loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.chatbotContainer}>
      {shouldLoadIframe && (
        <iframe
          src={WIDGET_URL}
          className={styles.chatbotIframe}
          title="AI Chatbot Widget"
          allow="microphone"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      )}
    </div>
  );
};

export default ChatbotWidget;
