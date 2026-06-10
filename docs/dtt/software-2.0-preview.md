# Deepthroat Trainer Software 2.0.0 Beta Preview

<iframe
  
  src="https://www.youtube.com/embed/N5KAoqPdEyE"
  title="Deepthroat Trainer 2.0.0 Beta Preview"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

!!! info
    All active subscribers are automatically enrolled in the beta stream during this rollout. A dashboard toggle to switch between <strong>Production</strong>, <strong>Beta</strong>, and <strong>Latest</strong> streams is coming soon.

## Core changes

### Cloud-based calibration

!!! note
    This feature is currently unavailable in beta and will return in the next patch.

    - Each device is calibrated once and saved to the cloud
    - You can reassign or manually adjust calibration in the dashboard
    - No need to recalibrate when switching devices

## Training and segments

### Expanded segment limits

The firmware now supports up to <strong>1,000 segments per training session</strong> (previously 3). The dashboard currently supports up to 100 segments per template. Dashboard UI for editing large segment sets is in development.

### Segment repeat

Build longer, more efficient training templates without manual duplication.

- Set any segment to repeat up to 3 times (or up to 100 times, if you have a subscription).
- Total effective segments (including repeats) cannot exceed the above limits.

### Depth scaling

Depth increase is now fully functional. Earlier versions ignored depth scaling — it is now active across all training modes.

### Segment-specific toy assignment

!!! note
    Pending implementation.

Assign different toys per segment to support mixed-material or size-based progression within a single session.

### Pass/fail grading

!!! tip
    <strong>Ultra exclusive</strong> — Add accountability to your training.

    - Set a minimum passing grade (0–100%) per segment
    - Segments below the threshold repeat until passed
    - Optional custom failure messages display on your device
    - Three consecutive failures on the same segment restart the entire training session

!!! warning
    Failing a segment three times in a row restarts your session from the beginning. Set achievable thresholds to avoid frustration.

## Customization and user control

### Device avatar system

Players are represented by an on-screen icon during training sessions (default avatar: turtle).
**[Customize your avatar](https://dashboard.researchanddesire.com/settings)**

Members with <strong>Ultra</strong>, <strong>Founder</strong>, and <strong>Pioneer</strong> subscriptions can customize their avatar from <strong>Settings &gt; My Devices</strong>.

**[Unlock your first avatar](https://dashboard.researchanddesire.com/faqs)**

Report a bug through the dashboard by clicking <strong>Help</strong> (bottom right) and then <strong>Contact Support</strong> to unlock your first device avatar.

### Full text customization

!!! note
    Firmware-ready. Dashboard support pending — rolling out to Ultra members first.

You’ll be able to edit every on-screen text element, including:
- Rewards and punishments
- Grades and scores
- UI labels and prompts

### Hands-free mode

!!! tip
    <strong>Ultra exclusive</strong> — Ideal for extended training sessions where you want uninterrupted progress.

Hands-free mode continues training automatically without button presses. Enable it per template in the dashboard.

### Step 1: Enable Hands-free Mode on a template

  Go to <strong>Deepthroat Trainer &gt; Templates</strong>, open a template, and toggle <strong>Hands-free</strong>.

!!! success
    Start the session and confirm segments advance without button input.

  

## Dashboard and UI improvements

### Training preview

When fetching settings, you now see a pre-start summary:
- Training name
- Assigned toy
- Total segments

!!! info
    Example: “Joy’s Training 101 — Toy: Pink 7-inch — 150 segments”.

### Performance improvements

Frame rate increased to <strong>120 Hz</strong> for smoother motion and improved responsiveness.

### Speed mode

Speed mode replaces the freeform dial. It measures your reps per minute and visualizes performance as staying above the 50% mark on the dial.

### Step 2: Verify Speed mode feedback

  Start a Speed mode session and maintain steady reps. Watch the dial — staying above the midpoint indicates you’re on pace.

### Unified scoring system

Freeform, Endurance, and Repetition modes now use the same scoring formula:

```text
Score = Time in Zone / Active Time
```

This creates a consistent experience across training modes.

## Offline use and storage

### Offline playback

Your device now replays the last downloaded settings even without Wi‑Fi. Pre-load sessions before heading to locations without internet access.

### Step 3: Prepare for offline use

  1. Connect to Wi‑Fi and fetch the latest settings
  2. Start and exit the session once to confirm it loads locally
  3. Disconnect Wi‑Fi and start the session again

!!! success
    The session runs with your last saved settings.

  

### Offline session saving

!!! note
    Pending implementation.

Store up to 100 segments locally and upload them when you reconnect.

## Coming soon
!!! note "Dashboard updates"
        - Large‑segment editing UI
        - Cloud‑based calibration tools
        - Customizable UI text editor

!!! note "Training features"
        - Segment‑specific toy assignment
        - Offline session syncing

!!! note "Rewards and unlocks"
        - Expanded icon unlock system
        - Additional avatar customization options

## Related guides
**[Ultra subscription benefits](https://dashboard.researchanddesire.com/subscription)**

Learn what’s included in Ultra and how to upgrade.

**[Deepthroat Trainer FAQs](/dtt/faqs)**

Answers to common questions about modes, segments, and more.

!!! tip
    Want community-made training? Explore <strong>Shareable Templates</strong> to browse and import public templates.
    **[Browse Shareable Templates](/dtt/quick-start/templates)**

Find templates with creator info, difficulty, and descriptions.
