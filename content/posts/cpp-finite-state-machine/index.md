+++
title = 'C++ Finite State Machine'
description = ''
date = 2024-02-23T09:38:22Z
draft = false
categories = ['Robotics', 'Coding']
tags = ['C++']
projects = ['Nerf Tank']
+++

The turret for my nerf tank is taken from
[Little French Kev's nerf turret project](https://www.littlefrenchkev.com/bluetooth-nerf-turret).
Initially, I used his code
([Github](https://github.com/LittleFrenchKev/Bluetooth_Nerf_turret)) to control
the firing mechanism but with input from a Bluetooth gamepad using
[Bluepad32](https://github.com/ricardoquesada/bluepad32).

```cpp
void fire() { //if motor byte on, turn motor on and check for time it has been on

  if (can_fire && !is_firing && motors_ON) {
    //if (can_fire && !is_firing) {
    firing_start_time = millis();
    recoil_start_time = millis();
    is_firing = true;
  }

  firing_current_time = millis();
  recoil_current_time = millis();

  if (is_firing && firing_current_time - firing_start_time < firing_time) {
    recoil_servo.write(recoil_pushed);
  }
  else if (is_firing && recoil_current_time - recoil_start_time < recoil_time) {
    recoil_servo.write(recoil_rest);
  }
  else if (is_firing && recoil_current_time - recoil_start_time > recoil_time) {
    is_firing = false;
  }
}
```

To control the turret on the nerf tank I wanted to implement a finite state
machine. This seems like the perfect way to manage the different states of the
turret so I started with a very simple state machine based on an `enum` and a
`switch` statement.

```cpp
enum State { IDLE, SPIN_UP, READY, FIRING, RECOIL, EMPTY };
State state = idle;

switch(state) {
  case: IDLE:
  // handle each state's actions and transitions
}
```

However, I wanted something that kept the state transition logic separate from
the actions in each state. To that end, I settled on using a C++ `map` to link
the states to their functions.

```cpp
std::map<int, StateHandler> stateHandlers = {
  { IDLE, handleIdleState },
  { SPIN_UP, handleSpinUpState },
  { READY, handleReadyState },
  { FIRING, handleFiringState },
  { RECOIL, handleRecoilState },
  { EMPTY, handleEmptyState }
};

// run the turret state machine
auto it = stateHandlers.find(firing_state);
if (it != stateHandlers.end()) {
  it->second();
} else {
  Serial.println("Unrecognized firing state.");
  firing_state = IDLE;
}
handleStateTransitions();
```

While the simplest approach to managing the transition logic is still a `switch`
statement, releasing the trigger buttons should always return the state machine
to its default state so I added a couple of sections to handle specific buttons
before a `switch` statement that handles time-based transitions.

```cpp
void handleStateTransitions() {
  // timing variables for state machine
  static long spinup_start_millis;
  static long firing_start_millis;
  static long recoil_start_millis;

  // timing intervals in milliseconds
  const int spinup_duration = 1000;
  const int firing_duration = 150;
  const int recoil_duration = 300;

  long current_millis = millis();

  if (isButtonPressed(L2)) {
    // move from IDLE to SPIN_UP
    if (firing_state == IDLE) {
      firing_state = SPIN_UP;
      spinup_start_millis = current_millis;
      return;
    }
  } else if (firing_state == READY || firing_state == SPIN_UP) {
    firing_state = IDLE;
    return;
  }


  if (isButtonPressed(R2)) {
    if (firing_state == READY) {
      firing_state = FIRING;
      firing_start_millis = current_millis;
      return;
    }
  }

  if (ammo == 0) { firing_state = EMPTY; }

  switch (firing_state) {
    case SPIN_UP:
      if (current_millis - spinup_start_millis > spinup_duration) {
        firing_state = READY;
      }
      break;
    case FIRING:
      if (current_millis - firing_start_millis > firing_duration) {
        firing_state = RECOIL;
        recoil_start_millis = current_millis;
        ammo--;
      }
      break;
    case RECOIL:
      if (current_millis - recoil_start_millis > recoil_duration) {
        firing_state = READY;
      }
      break;
  }
}
```

I'm not sure that it is necessary to have multiple timing variables if the
timing is reset for each new state. Removing these would probably help
readability. The generic `previous_millis` would probably suffice.

There is probably still further scope to improve this code but for now I am
happy with it. Going down the C++ route further, a fully class-based state
machine might be the better option. The next stage might be to implement
something like
[Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/blog/implementing-a-finite-state-machine-in-cpp/).
