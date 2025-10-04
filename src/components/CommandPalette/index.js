import React, { useState, useEffect, useRef } from 'react';
import {
  PaletteOverlay,
  PaletteContainer,
  SearchInputWrapper,
  SearchInput,
  CommandList,
  CommandItem,
  CommandInfo,
  CommandTitle,
  CommandShortcut,
} from './CommandPaletteStyle';
import { Bio } from '../../data/constants';
import SearchIcon from '@mui/icons-material/Search';

const CommandPalette = ({ isOpen, onClose, setDarkMode, darkMode }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    {
      title: 'Go to Home',
      action: () => (window.location.href = '#about'),
      shortcut: 'G H',
    },
    {
      title: 'Go to Skills',
      action: () => (window.location.href = '#skills'),
      shortcut: 'G S',
    },
    {
      title: 'Go to Experience',
      action: () => (window.location.href = '#experience'),
      shortcut: 'G E',
    },
    {
      title: 'Go to Projects',
      action: () => (window.location.href = '#projects'),
      shortcut: 'G P',
    },
    {
      title: 'Go to Contact',
      action: () => (window.location.href = '#contact'),
      shortcut: 'G C',
    },
    {
      title: 'Toggle Theme',
      action: () => setDarkMode(!darkMode),
      shortcut: 'T',
    },
    {
      title: 'Download Resume',
      action: () => window.open(Bio.resume, '_blank'),
      shortcut: 'D R',
    },
    {
      title: 'View GitHub Profile',
      action: () => window.open(Bio.github, '_blank'),
      shortcut: 'V G',
    },
  ];

  const filteredCommands = commands.filter((command) =>
    command.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <PaletteOverlay onClick={onClose}>
      <PaletteContainer onClick={(e) => e.stopPropagation()}>
        <SearchInputWrapper>
          <SearchIcon style={{ color: 'inherit' }} />
          <SearchInput
            ref={inputRef}
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
        </SearchInputWrapper>
        <CommandList>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
              <CommandItem
                key={command.title}
                className={index === selectedIndex ? 'selected' : ''}
                onClick={() => {
                  command.action();
                  onClose();
                }}
              >
                <CommandInfo>
                  <CommandTitle>{command.title}</CommandTitle>
                </CommandInfo>
                <CommandShortcut>{command.shortcut}</CommandShortcut>
              </CommandItem>
            ))
          ) : (
            <CommandItem>No results found.</CommandItem>
          )}
        </CommandList>
      </PaletteContainer>
    </PaletteOverlay>
  );
};

export default CommandPalette;
