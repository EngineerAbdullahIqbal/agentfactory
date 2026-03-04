#!/usr/bin/env node
/**
 * Quick validation script for Bookmarks implementation
 * Run after each task to verify TypeScript, linting, and conventions
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const LEARN_APP_DIR = join(process.cwd(), 'apps', 'learn-app');

const REQUIRED_FILES = [
  'src/types/bookmarks.ts',
  'src/utils/bookmarks/validation.ts',
  'src/utils/bookmarks/storage.ts',
  'src/utils/bookmarks/storage-adapter.ts',
  'src/hooks/useBookmarks.ts',
  'src/components/bookmarks/BookmarkDock.tsx',
  'src/components/bookmarks/BookmarkPanel.tsx',
  'src/pages/bookmarks.tsx',
];

function checkFileExists(file: string): boolean {
  return existsSync(join(LEARN_APP_DIR, file));
}

function runCommand(command: string, description: string): boolean {
  console.log(`\n${description}...`);
  try {
    execSync(command, { cwd: LEARN_APP_DIR, stdio: 'inherit' });
    console.log(`✅ ${description} passed`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed`);
    return false;
  }
}

console.log('🔖 Bookmarks Implementation Validator\n');

// Check required files
console.log('📁 Checking required files...');
const missingFiles = REQUIRED_FILES.filter(file => !checkFileExists(file));
if (missingFiles.length > 0) {
  console.log('⚠️  Missing files (expected during implementation):');
  missingFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.log('✅ All required files present');
}

// TypeScript compilation
runCommand(
  'npx tsc --noEmit',
  'TypeScript compilation'
);

// Linting
runCommand(
  'pnpm nx lint learn-app',
  'ESLint validation'
);

// Tests (if they exist)
if (existsSync(join(LEARN_APP_DIR, 'src/__tests__/bookmarks'))) {
  runCommand(
    'pnpm nx test learn-app --testPathPattern=bookmarks',
    'Unit tests'
  );
} else {
  console.log('\n⏭️  Skipping tests (not created yet)');
}

console.log('\n✅ Validation complete!\n');
