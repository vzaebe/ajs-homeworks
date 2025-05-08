import { Settings } from './Settings';

describe('Settings', () => {
    let settings;

    beforeEach(() => {
        settings = new Settings();
    });

    test('should have default settings', () => {
        const defaultSettings = settings.settings;
        expect(defaultSettings.get('theme')).toBe('dark');
        expect(defaultSettings.get('music')).toBe('trance');
        expect(defaultSettings.get('difficulty')).toBe('easy');
    });

    test('should update user settings', () => {
        settings.setUserSetting('theme', 'light');
        settings.setUserSetting('music', 'rock');
        
        const currentSettings = settings.settings;
        expect(currentSettings.get('theme')).toBe('light');
        expect(currentSettings.get('music')).toBe('rock');
        expect(currentSettings.get('difficulty')).toBe('easy'); // unchanged default
    });

    test('should maintain default settings for unchanged values', () => {
        settings.setUserSetting('theme', 'gray');
        
        const currentSettings = settings.settings;
        expect(currentSettings.get('theme')).toBe('gray');
        expect(currentSettings.get('music')).toBe('trance'); // default
        expect(currentSettings.get('difficulty')).toBe('easy'); // default
    });
}); 