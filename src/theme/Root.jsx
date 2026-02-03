// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ChatbotWidget from '@site/src/components/ChatbotWidget';

/**
 * Root component wrapper for Docusaurus
 * This component wraps the entire application and is used to add global elements
 * like the chatbot widget that should appear on every page.
 *
 * See: https://docusaurus.io/docs/swizzling#wrap-your-site-with-root
 */
export default function Root({ children }) {
  return (
    <>
      {children}
      <ChatbotWidget />
    </>
  );
}
