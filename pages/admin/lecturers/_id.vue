<template>
  <v-layout row="" wrap="">
    <v-flex xs12="">
      <v-layout row="" wrap="">
        <v-flex xs12="" md4="">
          <form @submit.prevent="onCreateOrEdit">
            <v-card>
              <v-toolbar card="">
                <v-toolbar-title>
                  <h2 class="headline">{{ lecturer.name }}</h2>
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-layout row="" wrap="">
                  <v-flex xs12="">
                    <v-text-field
                      v-model="editedLecturer.name"
                      v-validate="'required'"
                      :error-messages="errors.collect('name')"
                      :disabled="isLoading"
                      label="Name"
                      data-vv-name="name"
                      data-vv-as="name"
                      name="name"
                      required=""
                      clearable=""
                      box=""
                      autofocus=""
                      data-vv-value-path="editedLecturer.name"
                    />
                  </v-flex>
                </v-layout>
                <v-layout row="" wrap="">
                  <v-flex xs12="">
                    <v-text-field
                      v-model="editedLecturer.identifier"
                      v-validate="'required'"
                      :error-messages="errors.collect('identifier')"
                      :disabled="isLoading"
                      label="Identifier"
                      data-vv-name="identifier"
                      data-vv-as="identifier"
                      name="identifier"
                      required=""
                      clearable=""
                      box=""
                      data-vv-value-path="editedLecturer.identifier"
                    />
                  </v-flex>
                </v-layout>
                <v-layout row="" wrap="">
                  <v-flex xs12="" class="text-xs-center">
                    <v-hover>
                      <template #default="{ hover }">
                        <app-avatar
                          :name="removeTitle(lecturer.name)"
                          :image="avatarImage.url"
                          :size="128"
                          text-class="headline"
                        >
                          <v-fade-transition>
                            <v-container
                              v-if="hover"
                              fluid=""
                              fill-height=""
                              style="background-color: rgba(0, 0, 0, .5)"
                            >
                              <v-layout
                                fill-height=""
                                align-center=""
                                justify-center=""
                              >
                                <v-btn
                                  :disabled="isLoading"
                                  :loading="isLoading"
                                  color="error"
                                  @click="onRemoveAvatarImage"
                                >
                                  Remove
                                </v-btn>
                              </v-layout>
                            </v-container>
                          </v-fade-transition>
                        </app-avatar>
                      </template>
                    </v-hover>
                  </v-flex>
                </v-layout>
                <v-layout row="" wrap="">
                  <v-flex xs12="">
                    <input
                      ref="avatarImage"
                      style="display: none"
                      type="file"
                      name="image"
                      accept="image/jpeg,image/jpg"
                      @change="onAvatarImageSelected"
                    />
                    <v-btn
                      :disabled="isLoading"
                      :loading="isLoading"
                      color="primary"
                      @click="onSelectAvatarImage"
                    >
                      Select Image
                    </v-btn>
                    <span>{{ avatarImage.name }}</span>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="isLoading"
                  :loading="isLoading"
                  color="accent"
                  type="submit"
                  @click="onCreateOrEdit"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-flex>
        <v-flex xs12="" md8="">
          <v-card>
            <v-toolbar card="">
              <v-toolbar-title>Photo</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-tabs v-model="currentTab" slider-color="primary" class="mb-3">
                <v-tab ripple="" href="#capture">Capture</v-tab>
                <v-tab ripple="" href="#file-upload">File Upload</v-tab>
              </v-tabs>
              <v-tabs-items v-model="currentTab">
                <v-tab-item value="capture">
                  <v-layout row="" wrap="">
                    <v-flex xs12="" md6="">
                      <video
                        id="live-video"
                        ref="liveVideo"
                        width="720"
                        height="540"
                        autoplay=""
                      />
                    </v-flex>
                    <v-flex xs12="" md6="">
                      <canvas
                        id="live-canvas"
                        ref="liveCanvas"
                        width="720"
                        height="540"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row="" wrap="">
                    <v-flex xs12="" md6="">
                      <v-select
                        v-model="selectedCamera"
                        :items="cameras"
                        label="Select Camera"
                        box=""
                        item-value="deviceId"
                        item-text="label"
                      />
                    </v-flex>
                    <v-flex xs12="" md6="">
                      <v-btn
                        :disabled="isLoading"
                        :loading="isLoading"
                        color="accent"
                        @click="onTakePhoto"
                      >
                        Take a Photo
                      </v-btn>
                      <v-btn
                        :disabled="isLoading"
                        :loading="isLoading"
                        color="error"
                        @click="onResetPhoto"
                      >
                        Reset
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-tab-item>
                <v-tab-item value="file-upload">
                  <v-layout row="" wrap="">
                    <v-flex xs12="" md6="">
                      <v-img
                        src="/examples/images/tony-stark.jpg"
                        :aspect-ratio="456 / 400"
                        class="mb-3"
                      >
                        <template #placeholder="">
                          <v-layout
                            fill-height=""
                            align-center=""
                            justify-center=""
                            ma-0=""
                          >
                            <v-progress-circular
                              indeterminate=""
                              color="grey lighten-5"
                            />
                          </v-layout>
                        </template>
                      </v-img>
                      <h2 class="headline success--text">Good</h2>
                      <ol class="body-2">
                        <li>Face must be clearly visible</li>
                        <li>
                          Face must not covered with glasses, masks or other
                          objects that can cover
                        </li>
                        <li>If only one photo, face must face forward</li>
                        <li>
                          If more than one photo, at least there are 4 photos,
                          faces face up, down, right and left
                        </li>
                        <li>
                          Image resolution must be greater or equal than 720x540
                        </li>
                      </ol>
                    </v-flex>
                    <v-flex xs12="" md6="">
                      <v-img
                        src="/examples/images/iron-man.jpg"
                        :aspect-ratio="456 / 400"
                        class="mb-3"
                      >
                        <template #placeholder="">
                          <v-layout
                            fill-height=""
                            align-center=""
                            justify-center=""
                            ma-0=""
                          >
                            <v-progress-circular
                              indeterminate=""
                              color="grey lighten-5"
                            />
                          </v-layout>
                        </template>
                      </v-img>
                      <h2 class="headline error--text">Bad</h2>
                      <ol class="body-2">
                        <li>Face isn't clearly visible</li>
                        <li>
                          Face is covered with glasses, masks or other objects
                          that can cover
                        </li>
                      </ol>
                    </v-flex>
                  </v-layout>
                  <v-layout row="" wrap="">
                    <v-flex xs12="">
                      <input
                        ref="images"
                        style="display: none"
                        type="file"
                        name="image"
                        accept="image/jpeg,image/jpg"
                        multiple
                        @change="onImagesSelected"
                      />
                      <v-btn
                        :disabled="isLoading"
                        :loading="isLoading"
                        color="primary"
                        @click="onSelectImages"
                      >
                        Select Images
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row="" wrap="">
        <v-flex xs12="">
          <v-card>
            <v-toolbar card="">
              <v-toolbar-title>Photos</v-toolbar-title>
              <v-spacer />
              <v-fade-transition>
                <v-btn
                  v-if="removingImages.length > 0"
                  color="error"
                  @click="isRemoving = true"
                >
                  Remove {{ pluralize('image', removingImages.length, true) }}
                </v-btn>
              </v-fade-transition>
            </v-toolbar>
            <v-card-text>
              <v-container grid-list-xl="" fluid="">
                <v-data-iterator
                  :items="images"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                  :total-items="totalItems"
                  :loading="isLoading"
                  content-tag="v-layout"
                  row=""
                  wrap=""
                >
                  <template #item="{ item }">
                    <v-fade-transition>
                      <v-flex xs12="" sm6="" md4="" d-flex="">
                        <v-hover>
                          <template #default="{ hover }">
                            <v-card flat="" tile="" class="d-flex">
                              <v-img :src="item.path" :aspect-ratio="720 / 540">
                                <template #placeholder="">
                                  <v-layout
                                    fill-height=""
                                    align-center=""
                                    justify-center=""
                                    ma-0=""
                                  >
                                    <v-progress-circular
                                      indeterminate=""
                                      color="grey lighten-5"
                                    />
                                  </v-layout>
                                </template>
                                <v-fade-transition>
                                  <v-container
                                    v-if="removingImages.includes(item.id)"
                                    fluid=""
                                    fill-height=""
                                    style="background-color: rgba(0, 0, 0, .5)"
                                  >
                                    <v-layout
                                      row=""
                                      wrap=""
                                      fill-height=""
                                      align-center=""
                                      justify-center=""
                                    >
                                      <v-btn
                                        :disabled="isLoading"
                                        :loading="isLoading"
                                        color="accent"
                                        @click="onTriggerSelecting(item.id)"
                                      >
                                        Unselect
                                      </v-btn>
                                    </v-layout>
                                  </v-container>
                                </v-fade-transition>
                                <v-fade-transition>
                                  <v-container
                                    v-if="hover"
                                    fluid=""
                                    fill-height=""
                                    style="background-color: rgba(0, 0, 0, .5)"
                                  >
                                    <v-layout
                                      row=""
                                      wrap=""
                                      fill-height=""
                                      align-center=""
                                      justify-center=""
                                    >
                                      <v-btn
                                        :disabled="isLoading"
                                        :loading="isLoading"
                                        color="primary"
                                        @click="onUseAsAvatar(item.path)"
                                      >
                                        Use as Avatar
                                      </v-btn>
                                      <v-btn
                                        :disabled="isLoading"
                                        :loading="isLoading"
                                        color="accent"
                                        @click="onTriggerSelecting(item.id)"
                                      >
                                        Select
                                      </v-btn>
                                    </v-layout>
                                  </v-container>
                                </v-fade-transition>
                              </v-img>
                            </v-card>
                          </template>
                        </v-hover>
                      </v-flex>
                    </v-fade-transition>
                  </template>
                </v-data-iterator>
              </v-container>
              <v-tooltip left="">
                <template #activator="{ on }">
                  <v-fade-transition>
                    <v-btn
                      v-if="removingImages.length > 0"
                      color="error"
                      icon=""
                      fab=""
                      bottom=""
                      right=""
                      fixed=""
                      v-on="on"
                      @click="isRemoving = true"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-fade-transition>
                </template>
                <span>
                  Remove {{ pluralize('image', removingImages.length, true) }}
                </span>
              </v-tooltip>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="isRemoving" width="350" @input="onCloseRemoving">
        <v-card>
          <v-card-text>
            <div class="body-2">
              Are you sure you want to remove
              {{ pluralize('image', removingImages.length, true) }}?
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              :loading="isLoading"
              :disabled="isLoading"
              flat=""
              @click="onCloseRemoving"
            >
              Cancel
            </v-btn>
            <v-btn
              :loading="isLoading"
              :disabled="isLoading"
              color="error"
              flat=""
              @click="onRemoveTrainingImage(removingImages)"
            >
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import uuidValidate from 'uuid-validate'
import toFormData from 'json-form-data'
import { cloneDeep } from 'lodash/fp'

import { getImageFromCanvas, drawImage } from '~/utils/canvas'
import { fileReader, getFileFromUrl } from '~/utils/file'

import AppAvatar from '~/components/AppAvatar'

import string from '~/mixins/string'

import { types as cameraTypes } from '~/store/camera'

export default {
  validate({ params: { id = '' } }) {
    return uuidValidate(id, 4)
  },
  components: {
    AppAvatar
  },
  mixins: [string],
  head() {
    return {
      title: `Edit Lecturer - ${this.lecturer.name}`
    }
  },
  data() {
    return {
      isLoading: false,
      lecturer: {
        id: null,
        name: null,
        identifier: null,
        image: null,
        is_active: true,
        user_id: null
      },
      editedLecturer: {
        id: null,
        name: null,
        identifier: null,
        image: null,
        is_active: true,
        user_id: null
      },
      avatarImage: {
        name: '',
        url: '',
        file: null
      },

      currentTab: 'capture',
      images: [],
      imagesFilter: {
        limit: 0,
        offset: 0,
        pageCount: 0,
        orderBy: '-created_at',
        withDescriptor: 0
      },
      rowsPerPageItems: [
        9,
        18,
        32,
        { text: '$vuetify.dataIterator.rowsPerPageAll' }
      ],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 9,
        sortBy: 'created_at',
        totalItems: 9
      },
      totalItems: 0,

      isRemoving: false,
      removingImages: []
    }
  },
  computed: {
    ...mapState('camera', ['cameras']),
    selectedCamera: {
      get() {
        return this.$store.state.camera.selectedCamera
      },
      set(selectedCamera) {
        this.$store.commit(
          `camera/${cameraTypes.SET_SELECTED_CAMERA}`,
          selectedCamera
        )
      }
    }
  },
  watch: {
    currentTab(currentTab) {
      if (currentTab === 'capture') {
        this.initCamera()
      } else {
        this.stopCamera()
      }
    },
    'avatarImage.file': async function(file) {
      await this.onCreateOrEdit(null, {
        ...this.editedLecturer,
        image: file
      })
    },
    selectedCamera(selectedCamera) {
      this.initCamera(selectedCamera)
    },
    async images(images, oldImages) {
      if (images.length > oldImages.length) {
        // eslint-disable-next-line
        images = images.filter(({ has_descriptor }) => !has_descriptor)

        const descriptors = await this.getFaceDescriptors({ images })
        await Promise.all(
          // eslint-disable-next-line
          descriptors.map(({ image_id, descriptor }) =>
            this.$api.lecturerDescriptors.create({
              lecturerDescriptor: { lecturer_image_id: image_id, descriptor }
            })
          )
        )

        await Promise.all(
          images.map(({ id }) =>
            this.$api.lecturerImages.update(id, {
              lecturerImage: { has_descriptor: true }
            })
          )
        )
        await this.fetchImages()
      }
    },
    pagination: {
      handler({ descending, page, rowsPerPage, sortBy }) {
        if (descending) {
          sortBy = `-${sortBy}`
        }
        this.fetchImages({
          orderBy: sortBy,
          limit: rowsPerPage,
          // Taken from: https://stackoverflow.com/a/3521002/7711812
          offset: (page - 1) * rowsPerPage
        })
      },
      deep: true
    }
  },
  async asyncData({
    app: {
      $api: { lecturers, lecturerImages, departments, studyPrograms, groups },
      $handleError
    },
    params: { id = '' }
  }) {
    try {
      const [
        { lecturer },
        { rowCount, lecturerImages: lecturerImagesData, ...filter }
      ] = await Promise.all([
        lecturers.fetch(id),
        lecturerImages.fetchPage({
          orderBy: '-created_at',
          limit: 9,
          offset: 0,
          lecturer_id: id
        })
      ])
      return {
        lecturer,
        images: lecturerImagesData,
        imagesFilter: filter,
        totalItems: rowCount
      }
    } catch (error) {
      $handleError(error)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    this.stopCamera()
  },
  methods: {
    ...mapActions('camera', ['startCamera', 'stopCamera', 'getCameras']),
    ...mapActions('face', ['getFaceDescriptors']),
    async init() {
      await this.fetchLecturer()
      await Promise.all([this.prefillData(), this.getCameras()])
      await this.initCamera(this.selectedCamera)
    },
    async prefillData() {
      try {
        const { image, ...restData } = this.lecturer
        const imageFile = await getFileFromUrl(image)
        this.editedLecturer = {
          ...restData,
          image: imageFile
        }
        this.avatarImage.url = image
      } catch (error) {
        this.$handleError(error)
      }
    },
    async initCamera(deviceId) {
      try {
        const videoStream = await this.startCamera(deviceId)
        this.$refs.liveVideo.srcObject = videoStream
      } catch (error) {
        this.$handleError(error)
      }
    },
    async fetchLecturer() {
      try {
        this.isLoading = true
        const { id } = this.$route.params
        const { lecturer } = await this.$api.lecturers.fetch(id)
        this.lecturer = lecturer
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchImages(
      { orderBy, limit, offset } = {
        orderBy: '-created_at',
        limit: 9,
        offset: 0
      }
    ) {
      try {
        this.isLoading = true
        const { id } = this.$route.params
        // eslint-disable-next-line
        const {
          rowCount,
          lecturerImages,
          ...filter
        } = await this.$api.lecturerImages.fetchPage({
          orderBy,
          limit,
          offset,
          lecturer_id: id
        })
        this.images = lecturerImages
        this.imagesFilter = filter
        this.totalItems = rowCount
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.isLoading = false
      }
    },
    onSelectAvatarImage() {
      this.$refs.avatarImage.click()
    },
    async onAvatarImageSelected(event) {
      try {
        const {
          target: { files = [] }
        } = event
        if (files.length > 0) {
          const [file] = files
          if (file !== null) {
            const url = await fileReader(file)
            this.avatarImage = {
              name: file.name,
              url,
              file
            }
          }
        }
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.$refs.avatarImage.value = null
      }
    },
    onSelectImages() {
      this.$refs.images.click()
    },
    async onImagesSelected(event) {
      try {
        const {
          target: { files }
        } = event
        if (files.length > 0) {
          const { id } = this.$route.params
          // Taken from: https://stackoverflow.com/a/55781766/7711812
          const payload = new FormData()
          payload.append('has_descriptor', false)
          // Taken from: https://stackoverflow.com/a/40902462/7711812
          const filesArray = Array.from(files)
          filesArray.forEach(file => {
            payload.append('images', file)
          })
          await this.$api.lecturerImages.create(payload, {
            lecturer_id: id
          })
          await Promise.all([
            this.fetchImages(),
            this.$notify({
              kind: 'success',
              message: `${this.pluralize(
                'Photo',
                filesArray.length,
                true
              )} ${this.pluralize(
                'is',
                filesArray.length
              )} uploaded successfully`
            })
          ])
        }
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.$refs.images.value = null
      }
    },
    async onTakePhoto() {
      try {
        this.isLoading = true
        const { id } = this.$route.params
        const video = this.$refs.liveVideo
        const canvas = this.$refs.liveCanvas
        const canvasCtx = canvas.getContext('2d')
        drawImage(canvasCtx, video, 0, 0, 720, 540, 0, true, false)
        const image = await getImageFromCanvas(canvas)
        let payload = {
          images: image,
          has_descriptor: false
        }
        payload = toFormData(payload)
        await this.$api.lecturerImages.create(payload, {
          lecturer_id: id
        })
        await Promise.all([
          this.fetchImages(),
          this.$notify({
            kind: 'success',
            message: 'Photo is uploaded successfully'
          })
        ])
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.isLoading = false
      }
    },
    onResetPhoto() {
      const canvas = this.$refs.liveCanvas
      const canvasCtx = canvas.getContext('2d')
      canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height)
      canvasCtx.beginPath()
    },
    async onRemoveAvatarImage() {
      await this.onCreateOrEdit(null, {
        ...this.editedLecturer,
        image: ''
      })
      this.avatarImage = {
        name: '',
        url: '',
        file: null
      }
    },
    onTriggerSelecting(id) {
      if (this.removingImages.includes(id)) {
        const removingId = this.removingImages.findIndex(
          imageId => imageId === id
        )
        this.removingImages.splice(removingId, 1)
      } else {
        this.removingImages.push(id)
      }
    },
    onCloseRemoving(isReset = false) {
      this.isRemoving = false
      if (isReset) {
        this.removingImages = []
      }
    },
    async onRemoveTrainingImage(removingImages = []) {
      try {
        this.isLoading = true
        if (removingImages.length > 0) {
          await Promise.all(
            removingImages.map(id => this.$api.lecturerImages.destroy(id))
          )
          await Promise.all([
            this.fetchImages(),
            this.onCloseRemoving(true),
            this.$notify({
              kind: 'success',
              message: `${this.pluralize(
                'Photo',
                removingImages.length,
                true
              )} ${this.pluralize(
                'is',
                removingImages.length
              )} removed successfully`
            })
          ])
        }
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.isLoading = false
      }
    },
    async onUseAsAvatar(path) {
      const payload = {
        ...this.editedLecturer,
        image: await getFileFromUrl(path)
      }
      await this.onCreateOrEdit(null, payload)
    },
    async onCreateOrEdit(event, _payload = this.editedLecturer) {
      try {
        const valid = await this.$validator.validate()
        if (valid) {
          this.isLoading = true

          let payload = cloneDeep(_payload)

          payload = {
            ...payload,
            updated_at: new Date().toISOString()
          }

          if (payload.image) {
            payload = toFormData(payload)
          } else {
            payload = {
              lecturer: payload
            }
          }

          const {
            params: { id }
          } = this.$route
          await this.$api.lecturers.update(id, payload, {
            lecturer_id: this.lecturer.id
          })
          await this.fetchLecturer()
          await Promise.all([
            this.prefillData(),
            this.$validator.reset(),
            this.$notify({
              kind: 'success',
              message: 'Profile is updated successfully'
            })
          ])
        } else {
          this.$notify({
            isError: true,
            message: 'Please fill all the required field to continue'
          })
        }
      } catch (error) {
        this.$handleError(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>