import React, { useState, useEffect } from 'react';
import { Bio } from '../../data/constants';
// Yahaan galat import tha, ab theek kar diya gaya hai
import {
    Container,
    Wrapper,
    Title,
    Desc,
    ActivityContainer,
    ActivityItem,
    ActivityIcon,
    ActivityDetails,
    ActivityText,
    RepoLink,
    ActivityDate,
    ErrorText
} from './GithubActivityStyle'; // <- Corrected import path
import CommitIcon from '@mui/icons-material/Commit';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

// Helper function to format date
const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};


const GithubActivity = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const githubUsername = Bio.github.split('/').pop();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${githubUsername}/events/public`);
                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub activity');
                }
                const data = await response.json();
                // Filter and show latest 5 relevant events
                const filteredEvents = data.filter(event =>
                    event.type === 'PushEvent' ||
                    event.type === 'CreateEvent' ||
                    event.type === 'WatchEvent'
                ).slice(0, 5);
                setEvents(filteredEvents);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [githubUsername]);

    const renderEvent = (event) => {
        switch (event.type) {
            case 'PushEvent':
                return (
                    <ActivityText>
                        Pushed {event.payload.commits.length} new commit(s) to <RepoLink>{event.repo.name}</RepoLink>
                    </ActivityText>
                );
            case 'CreateEvent':
                return (
                    <ActivityText>
                        Created a new repository: <RepoLink>{event.repo.name}</RepoLink>
                    </ActivityText>
                );
            case 'WatchEvent':
                 return (
                    <ActivityText>
                        Starred a repository: <RepoLink>{event.repo.name}</RepoLink>
                    </ActivityText>
                );
            default:
                return null;
        }
    }

    const getIcon = (eventType) => {
        switch (eventType) {
            case 'PushEvent': return <CommitIcon />;
            case 'CreateEvent': return <AddIcon />;
            case 'WatchEvent': return <StarIcon />;
            default: return null;
        }
    }

    return (
        <Container id="github-activity">
            <Wrapper>
                <Title>Live GitHub Activity</Title>
                <Desc>
                    Here's what I've been up to recently. This feed updates live from my GitHub profile!
                </Desc>
                <ActivityContainer>
                    {loading && <ErrorText>Fetching latest activity...</ErrorText>}
                    {error && <ErrorText>Error: {error}</ErrorText>}
                    {!loading && events.length === 0 && !error && <ErrorText>No recent activity to show.</ErrorText>}
                    {!loading && events.map(event => (
                        <ActivityItem key={event.id} href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer">
                            <ActivityIcon>{getIcon(event.type)}</ActivityIcon>
                            <ActivityDetails>
                                {renderEvent(event)}
                                <ActivityDate>{timeSince(event.created_at)}</ActivityDate>
                            </ActivityDetails>
                        </ActivityItem>
                    ))}
                </ActivityContainer>
            </Wrapper>
        </Container>
    );
};

export default GithubActivity;

