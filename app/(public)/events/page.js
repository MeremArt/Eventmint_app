"use client";
import EventCard from "@/components/EventCard";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import data from "@/app/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dummy data for events

// Dummy data for user registrations
const dummyRegistrations = [
  {
    id: "1",
    eventId: "1",
    leaderEmail: "user@example.com",
    teamMembers: [{ memberEmail: "teammember@example.com" }],
  },
  // Add more dummy registrations as needed
];

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showLiveEvents, setShowLiveEvents] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const user = null; // Replace with actual user fetching logic
  const loggedEmail = user?.email || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data
        setUserRegistrations(dummyRegistrations);
        setEvents(data.dummyEvents);
      } catch (error) {
        console.error("Error fetching user registrations or events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedEmail]);

  const filteredEvents = events.filter((event) => {
    const today = new Date();
    const isLiveEvent = showLiveEvents && event.dateObject >= today;
    const isPastEvent = showPastEvents && event.dateObject < today;
    const matchesName = event.name
      .toLowerCase()
      .includes(eventNameFilter.toLowerCase());

    const isMyEvent =
      loggedEmail &&
      showMyEvents &&
      userRegistrations.some(
        (registration) =>
          registration.eventId === event.id &&
          (registration.leaderEmail === loggedEmail ||
            (registration.teamMembers &&
              registration.teamMembers.some(
                (member) => member.memberEmail === loggedEmail
              )))
      );

    return (isLiveEvent || isPastEvent || isMyEvent) && matchesName;
  });

  const slicedEvents = filteredEvents.slice(0, visibleEvents);

  const handleLoadMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 6);
  };

  return (
    <>
      <section className="flex justify-center dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] min-h-[100vh]">
        <div className="container mt-24 pb-12">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-4xl text-center font-bold">
              {data?.eventPageTitle} ({loading ? "_" : events.length})
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              {data?.eventPageDescription}
            </p>

            <div className="flex space-x-8 flex-wrap items-center justify-center">
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="live-events"
                  checked={showLiveEvents}
                  onCheckedChange={() => setShowLiveEvents(!showLiveEvents)}
                />
                <label
                  htmlFor="live-events"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Upcoming Events
                </label>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="past-events"
                  checked={showPastEvents}
                  onCheckedChange={() => setShowPastEvents(!showPastEvents)}
                />
                <label
                  htmlFor="past-events"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Past Events
                </label>
              </div>

              {loggedEmail && (
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="my-events"
                    checked={showMyEvents}
                    onCheckedChange={() => setShowMyEvents(!showMyEvents)}
                  />
                  <label
                    htmlFor="my-events"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    My Events
                  </label>
                </div>
              )}
            </div>

            <div className="max-w-[400px] mt-2">
              <Input
                type="text"
                placeholder="Filter by Event Name"
                value={eventNameFilter}
                onChange={(e) => setEventNameFilter(e.target.value)}
                className="mt-4"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 justify-around mt-10">
            {loading ? (
              <div className="mt-8">
                <Loader />
              </div>
            ) : (
              slicedEvents.length === 0 && (
                <p className="mt-4">
                  We currently don't have any matching events. 💖
                </p>
              )
            )}
            {slicedEvents.map((event) => (
              <div key={event.id}>
                <EventCard
                  data={event}
                  expired={event.dateObject < new Date()}
                />
              </div>
            ))}
          </div>

          {visibleEvents < filteredEvents.length && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleLoadMore} variant="secondary">
                Load More Events &#10227;
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default EventsPage;
