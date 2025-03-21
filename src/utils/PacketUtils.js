
// src/utils/PacketUtils.js

/**
 * Parse a command string into command and arguments
 * @param {string} message - The message starting with '/'
 * @returns {Object|null} - Command data or null if not a valid command
 */
export const parseCommand = (message) => {
  if (!message.startsWith('/')) return null;
  
  const parts = message.slice(1).split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

/**
 * Format a message (e.g., handle special formatting like *action*)
 * @param {string} message - The message to format
 * @returns {string} - Formatted message
 */
export const formatMessage = (message) => {
  // Handle /me action messages
  if (message.startsWith('*') && message.endsWith('*')) {
    return message; // Already formatted as action
  }
  
  return message;
};

/**
 * Check if the user has permissions for a specific action
 * @param {Array} userRoles - Array of user roles
 * @param {Array} requiredRoles - Array of required roles for the action
 * @returns {boolean} - Whether the user has permission
 */
export const hasPermission = (userRoles, requiredRoles) => {
  if (!userRoles || !requiredRoles) return false;
  return userRoles.some(role => requiredRoles.includes(role));
};
