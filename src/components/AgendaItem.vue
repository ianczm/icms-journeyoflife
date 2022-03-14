<template>
        <h1 class="time">{{ time }}</h1>
        <div class="info">
            <h2 class="title">{{ agenda.title }}</h2>
            <p class="body">{{ agenda.body }}</p>
        </div>
        <div class="link">
            <a
                class="glow-button"
                :href="agenda.notice.link"
                target="_blank"
            >{{ agenda.notice.text }}</a>
        </div>
</template>

<script>
export default {
    props: ['agenda'],
    data() {
        return {
            time: '',
        }
    },
    beforeMount() {
        const date = new Date(this.agenda.time.seconds * 1000);
        this.time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    },
}
</script>

<style lang="scss">
@import "src/assets/scss/_global.scss";

.agenda-container {
    .agenda {
        @include createGlass();
        padding: 40px 50px;
        border-radius: 25px;
        height: auto;

        display: grid;
        align-items: center;
        grid-template-columns: 7fr 14fr 8fr;
        grid-template-rows: auto;
        grid-template-areas: 'time body button';
        grid-gap: 30px;

        .time {
            grid-area: time;
            margin-top: 0;
            font-size: 2rem;
            margin-bottom: 0px;
        }

        .info {
            grid-area: body;
            .title {
                margin-bottom: 15px;
            }
            .body {
                font-size: 1.075rem;
                margin-bottom: 0px;
            }
        }

        .link {
            grid-area: button;
            text-align: right;
            .glow-button {
                text-align: center;
            }
        }

        &:not(:last-child) {
            margin-bottom: 25px;
        }
    }
}

@media only screen and (max-width: 1050px) {
    .agenda-container {
        .agenda {
            padding: 35px 40px;
            grid-template-columns: 3fr 4fr;
            grid-template-rows: auto auto;
            grid-template-areas: 'time button' 'body body';
            grid-gap: 15px;

            .link {
                text-align: right;
            }
        }
    }
}

@media only screen and (max-width: 768px) {
    .agenda-container {
        .agenda {
            .time {
                font-size: 1.5rem;
            }
            .info {
                .title {
                    font-size: 1.15rem;
                }
                .body {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>